import axiosConfig from '../config/axiosConfig';

export const adminService = {
  createAdmin: async (data) => {
    try {
      const response = await axiosConfig.post('/admin/createAdmin', {
        username: data.username, 
        email: data.email,
        password: data.password,
        phone_number : data.phone_number,
      });
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error.message);
      throw error;
    }
  },
  
    getAllUser: async (params) => {
        try {
          const response = await axiosConfig.post(`/admin/getAllUser?limit=${params.limit}&skip=${params.skip}`);

          return response.data;
        } catch (error) {
          console.error('Error during signup:', error.message);
          throw error;
        }
    },
    getAllPost: async (params) => {
      try{
        const response = await axiosConfig.post(`/admin/getAllPost?limit=${params.limit}&skip=${params.skip}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    getAllPostByStatus: async (params) => {
      try{
        const response = await axiosConfig.post(`/admin/getAllPostByStatus?&limit=${params.limit}&skip=${params.skip}`,{
          status: params.status,
        });
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    acceptPost: async (postId) => {
      try{
        const response = await axiosConfig.post(`/admin/acceptPost/${postId}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    rejectPost: async (postId) => {
      try{
        const response = await axiosConfig.post(`/admin/unacceptPost/${postId}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    deletePost: async (postId) => {
      try {
        const response = await axiosConfig.post(`/admin/deletePost/${postId}`);
        return response.data;
      } catch (error) {
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    getAllReport: async (params) => {
      try{
        const response = await axiosConfig.post(`/admin/getAllRerport?limit=${params.limit}&skip=${params.skip}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    deleteReport: async (reportId) => {
      try{
        const response = await axiosConfig.post(`/admin/deleteReport/${reportId}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countUserByDay: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countUserByDay`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countUserByWeek: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countUserByWeek`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countUserByMonth: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countUserByMonth`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countPostByDay: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countPostByDay`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countPostByWeek: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countPostByWeek`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countPostByMonth: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countPostByMonth`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },

    countReportByDay: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countReportByDay`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countReportByWeek: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countReportByWeek`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    countReportByMonth: async () => {
      try{
        const response = await axiosConfig.post(`/admin/countReportByMonth`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    setViolation: async (reportId) => {
      try{
        const response = await axiosConfig.post(`/admin/setViolation/${reportId}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
    unViolation: async (reportId) => {
      try{
        const response = await axiosConfig.post(`/admin/unViolation/${reportId}`);
        return response.data;
      }
      catch(error){
        console.error('Error during signup:', error.message);
        throw error;
      }
    },
};