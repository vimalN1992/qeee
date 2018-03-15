import {
    INSTITUTECODE_CHANGED, 
    USERNAME_CHANGED, 
    PASSWORD_CHANGED, 
    SERVERIP_CHANGED, 
    SERVERIP_FAILED, 
    LOGIN_SUCCESS,
    LOGIN_INIT,
    SERVER_NOT_REACHABLE,
    LOGGED_IN,
    ON_LOGOUT
 } from '../actions/types';

 
const INIT = {
    id: null,
    institutecode:'',
    username: '', 
    password: '', 
    serverIP: '', 
    error: '', 
    isLoggedIn: false, 
    loading: false 
};

export default (state = INIT, action) => { 
    switch (action.type) {  
        case INSTITUTECODE_CHANGED:
            return { ...state, institutecode: 'PCE', error: '' };
        case USERNAME_CHANGED:
            return { ...state, username: '2015pcememanjeet', error: '' };
        case PASSWORD_CHANGED:
            return { ...state, password: 'student', error: '' };
        // case INSTITUTECODE_CHANGED:
        //     return { ...state, institutecode: action.payload, error: '' };   
        // case USERNAME_CHANGED:  
        //     return { ...state, username: action.payload, error: '' };
        // case PASSWORD_CHANGED:  
        //     return { ...state, password: action.payload, error: '' };   
        case LOGIN_SUCCESS:  
            return { ...state, error: '', isLoggedIn: true, username: action.payload.username, password: action.payload.password, id: action.payload.id, loading: false };   
        case LOGIN_INIT:  
            return { ...state, error: '', loading: true };    
        case SERVER_NOT_REACHABLE:  
            return { ...state, error: action.payload, loading: false };   
        case LOGGED_IN:  
            return { ...state, error: '', loading: false, isLoggedIn: true }; 
        case ON_LOGOUT: 
            return { ...state, error: '', loading: false, isLoggedIn: false };    
        case SERVERIP_FAILED:  
            return { ...state, error: action.payload, loading: false };                                                                             
        default:
            return state;
    }
};