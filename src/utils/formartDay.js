import moment from 'moment';

export const formartDay = {
    formartDayDown: (date) => {
        return moment(date).fromNow();
    },
    formartDayUp: (date) =>{
        return moment(date).format('MMMM Do YYYY');
    }
}