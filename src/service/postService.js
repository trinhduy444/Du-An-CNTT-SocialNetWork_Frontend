import axiosConfig from '../config/axiosConfig';

export const postService = {
    getAllPost: async (params) => {
        try{
            const response = await axiosConfig.get(`/post/getAllPost?limit=${params.limit}&skip=${params.skip}`)
            return response.data;
        }catch(err){
            console.error('Error fetching all posts:', err.message);
            throw err;
        }
    },

    getAllPostByID: async (params) => {
        try {
            const response = await axiosConfig.get(`/post/getAllPostByType/${params.idCat}?limit=${params.limit}&skip=${params.skip}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching all posts:', err.message);
            throw err;
        }
    }, 
    createPost: async (data) => {
        try {
            const response = await axiosConfig.post(`/post/createPost`, data);
            return response.data;
        } catch (err) {
            console.error('Error creating post:', err.message);
            throw err;
        }
    },
    updatePost: async (postId, data) => {
        try {
            const response = await axiosConfig.post(`/post/updatePost/${postId}`, data);
            return response.data;
        } catch (err) {
            console.error('Error updating post:', err.message);
            throw err;
        }
    },
    deletePost: async (postId) => {
        try {
            const response = await axiosConfig.post(`/post/deletePost/${postId}`);
            return response.data;
        }catch (error){
            console.error('Error deleting post:', error.message);
            throw error;
        }
    },

    likePost: async (postId) => {
        try {
            const response = await axiosConfig.post(`/post/react/likeAPost/${postId}`);
            return response.data;
        }catch (error){
            console.error('Error liking post:', error.message);
            throw error;
        }
    },
    disLikePost: async (postId) => {
        try {
            const response = await axiosConfig.post(`/post/react/dislikeAPost/${postId}`);
            return response.data;
        }catch (error){
            console.error('Error disliking post:', error.message);
            throw error;
        }
    },
    createComment: async (content,postId) => {
        console.log(content)
        try {
            const response = await axiosConfig.post(`/post/react/createComment/${postId}`, {content});
            return response.data;
        }catch (error){
            console.error('Error creating comment:', error.message);
            throw error;
        }
    },
    getAllCommentFromAPost: async (params) => {
        try {
            const response = await axiosConfig.get(`/post/react/getAllCommentFromAPost/${params.postId}?limit=${params.limitcmt}&skip=${params.skipcmt}`);
            // console.log("o trong get",response.data.metadata)
            return response.data;
        }catch (error){
            console.error('Error getting all comment:', error.message);
            throw error;
        }
    },
    
}