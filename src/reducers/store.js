import { createStore,combineReducers , applyMiddleware } from 'redux'; 
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import {thunk} from 'redux-thunk';
const initialState = {
  profileData: null,
};

// Reducer xử lý các action
const rootReducer = combineReducers({
  auth: authReducer,
  profileData: profileReducer,

});

const store = createStore(rootReducer,initialState, applyMiddleware(thunk)); 


export default store;