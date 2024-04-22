import axiosConfig from '../config/axiosConfig';

export const interactionSerivce = {
    addFollow: async (userid)=>{
        try{
            const response = await axiosConfig.post(`/interaction/follow/addFollow/${userid}`);
            return response.data;
        }
        catch(error){
            console.error('Error adding follow:', error.message);
            throw error;
        }
    },
    unFollow: async (userid)=>{
        try{
            const response = await axiosConfig.post(`/interaction/follow/unFollow/${userid}`);
            return response.data;
        }
        catch(error){
            console.error('Error adding follow:', error.message);
            throw error;
        }
    },
    checkFollow: async (userid, follower_id) => {
        try {
            const response = await axiosConfig.get(`/interaction/follow/checkFollow/${userid}`, {
                params: {
                    follower_id: follower_id,
                }
            });
            return response.data.metadata;
        } catch (error) {
            console.error('Error checking follow:', error.message);
            throw error;
        }
    }
    
}