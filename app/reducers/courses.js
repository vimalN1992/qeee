import {
    GET_SESSION,
    GET_COURSES,
    LOGGED_IN,
    COURSE_OUTLINE,
    BOOK_INDEX,
    FORUM_COURSE_LIST,
    FORUM_LIST,
    FORUM_DISCUSSION_LIST,
    FORUM_POST,
    PROFILE_EDIT,
    GET_ALL_PHASE_COURSES
} from '../actions/types';


const INIT = { 
    sessions : {},
    courses: {},
    outline: {},
    BookIndex: {},
    loading: true,
    courseslist:{},
    forum_list:{},
    user_details:{},
    phasecourseslist:{}
};

export default (state = INIT, action) => {  
    switch(action.type){
        case GET_SESSION:  
            return { ...state, sessions: action.payload };  
        case GET_COURSES:
            return { ...state, courses: action.payload };
        case COURSE_OUTLINE: 
            return { ...state, outline: action.payload };  
        case BOOK_INDEX:
            return { ...state, loading: false, BookIndex: action.payload };     
        case FORUM_COURSE_LIST:
            return { ...state, courseslist: action.payload };
        case FORUM_LIST:
            return { ...state, forum_list: action.payload };
        case FORUM_DISCUSSION_LIST:
            return { ...state, forum_discussion: action.payload };  
        case FORUM_POST:
            return { ...state, forum_discussion: action.payload };
        case PROFILE_EDIT:
            return { ...state, user_details: action.payload };   
        case GET_ALL_PHASE_COURSES:
            return { ...state, phasecourseslist: action.payload };                 
        default:
            return state;             
    }
}