
const initialState = {
    isAdminLoggedIn: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_IS_ADMIN_LOGGED_IN':
        return {
          ...state,
          isAdminLoggedIn: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  