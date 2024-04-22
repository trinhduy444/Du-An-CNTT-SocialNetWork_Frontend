const initialState = {
    profileData: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_PROFILE_DATA':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;
