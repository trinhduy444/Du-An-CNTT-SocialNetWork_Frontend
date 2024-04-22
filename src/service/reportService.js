import axiosConfig from '../config/axiosConfig';

export const reportService = {
    getAllReportTypes: async (report_from) =>{
        try{
            const response = await axiosConfig.post(`/interaction/report/getAllReportTypes`,{
                report_from: report_from
            });
            return response.data;
        }catch(err){
            console.error('Error fetching all report types:', err.message);
            throw err;
        }
    },
    createReport: async (formData,userId) =>{
        try{
            const response = await axiosConfig.post(`/interaction/report/createReport/${userId}`, formData);
            return response.data;
        }
        catch(err){
            console.error('Error creating report:', err.message);
            throw err;
        }
    }
}