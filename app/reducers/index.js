import { combineReducers } from 'redux';
import Auth from './auth';
import { AppRoot,BookNav } from './nav';
import courses from './courses';

export default combineReducers({
    Auth, 
    Nav:AppRoot,
    courses
});
