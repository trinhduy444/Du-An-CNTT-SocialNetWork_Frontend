import axios from 'axios';
import Cookies from 'js-cookie';
import {authService} from '../service/authService'
export const BASE_URL = 'http://localhost:4000/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});


let isRefreshing = false;
let refreshTokenRequestQueue = [];

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      config.headers['x-rtoken-id'] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const accessToken = await new Promise((resolve) => {
            refreshTokenRequestQueue.push((newAccessToken) => {
              resolve(newAccessToken);
            });
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise((resolve, reject) => {
        authService.refreshToken().then((response) => {
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;
          Cookies.set('refreshToken', refreshToken, { expires: 7 });
          localStorage.setItem('accessToken', accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          for (let subscriber of refreshTokenRequestQueue) {
            subscriber(accessToken);
          }
          refreshTokenRequestQueue = [];
          resolve(instance(originalRequest));
        }).catch((err) => {
          reject(err);
        }).finally(() => {
          isRefreshing = false;
        });
      });
    }
    return Promise.reject(error);
  }
);

export default instance;


// import axios from 'axios';
// import Cookies from 'js-cookie';

// export const BASE_URL = 'http://localhost:4000/api/v1';

// const instance = axios.create({
//   baseURL: BASE_URL,
// });

// const getToken =() => {
//   const accessToken = localStorage.getItem('accessToken');
//   const refreshToken = Cookies.get('refreshToken');
  
//   const token = {"accessToken":accessToken, "refreshToken": refreshToken};
//   return token;
// }
// setInterval(getToken, 8 * 60 * 1000);

// instance.interceptors.request.use(
//   async (config) => {
//     const token = getToken();
//     config.headers.Authorization = `Bearer ${token.accessToken}`;
//     config.headers['x-rtoken-id'] = token.refreshToken;
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;
