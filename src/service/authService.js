import axiosConfig from '../config/axiosConfig';
import Cookies from 'js-cookie';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosConfig.post('/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response.data.metadata.accessToken;
        localStorage.setItem('accessToken', accessToken);
        const refreshToken = response.data.metadata.refreshToken;
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error(` ${error.message}`);
      }
    }
  },
  signup: async (username, email, phone_number, password ) => {
    try {
      const response = await axiosConfig.post('/auth/signup', {
        username: username, 
        email: email,
        password: password,
        phone_number : phone_number,
      });
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error.message);
      throw error;
    }
  },
  logout: async () => {
    try {
      const accessToken = Cookies.get('refreshToken');
      if (!accessToken) {
        throw new Error('User not logged in');
      }
  
      const response = await axiosConfig.post('/auth/logout');
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken');
      return response.data;
    } catch (error) {
      console.error('Error logout::', error.message);
      throw error;
    }
  },
  isLoggedIn : () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? true : false;
  },
  refreshToken: async () => {
    try{const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response= await axiosConfig.post('/auth/refreshAT');
    if(response.status !== 200) {
      throw new Error('Unexpected response status:', response.status);
    }
    else{
      const newAccessToken = response.data.metadata.newAccessToken;
      localStorage.setItem('accessToken', newAccessToken);
      axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      const newRefreshToken = response.data.metadata.newRefreshToken;
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
    }

    }catch (error) {
      console.error('Error during refresh token:', error.message);
      throw error;
      
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axiosConfig.post('/auth/forgotPassword', {
        email: email,
      });
      return response.data;
    } catch (error) {
      console.error('Error during forgotPassword:', error.message);
      throw error;
    }
  },
  resetPassword: async (token, password, confirmPassword) => {
    try {
      const response = await axiosConfig.post(`/auth/resetPassword/${token}`, {
        newPassword: password,
        repeatNewPassword: confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error during resetPassword:', error.message);
      throw error;
    }
  },
  changePassword: async (currentPassword, newPassword, repeatNewPassword) => {
    console.log(currentPassword, newPassword, repeatNewPassword);
    try {
      const response = await axiosConfig.post(`/auth/changePassword`, {
        currentPassword,
        newPassword,
        repeatNewPassword,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during changePassword:', error.message);
      throw error;
    }
  }
};