import axiosConfig from '../config/axiosConfig';

export const profileService = {
  getProfile: async () => {
    try {
      const response = await axiosConfig.post('/user/getProfile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  },
  getAvatar: async () => {
    try {
      const response = await axiosConfig.post('/user/getAvatar');

      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching avatar:', error.message);
      throw error;
    }
  },
  updateProfile: async (newProfileData) => {
    try {
      const response = await axiosConfig.post('/user/updateProfile', newProfileData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error.message);
      throw error;
    }
  },
  updateAvatar: async (avatarFormData) => {
    try {
      let imageUpdate = await axiosConfig.post('/user/updateAvatar', avatarFormData);
      return imageUpdate.data;
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      throw error;
    }
  },
  getProfileById: async (params) => {
    try {
      const response = await axiosConfig.get(`/user/viewProfileByID/${params.userid}`,{
        limit: params.limit,
        skip:  params.skip,
    });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  },
  viewFollowers: async (userId) => {
    try {
      const response = await axiosConfig.get(`/user/viewFollowers/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching followers:', error.message);
      throw error;
    }
  },
  viewFolloweds: async (userId) => {
    try {
      const response = await axiosConfig.get(`/user/viewFolloweds/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching followeds:', error.message);
      throw error;
    }
  },
}