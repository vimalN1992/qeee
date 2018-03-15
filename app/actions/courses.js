import { AsyncStorage } from 'react-native';
import axios from 'axios';
import querystring from 'querystring';

import { reqHeader } from '../config/Config'
import {
    GET_SESSION,
    GET_COURSES,
    SEE_MORE,
    VIEW_BOOK,
    SELECT_BOOK,
    COURSE_OUTLINE,
    BOOK_INDEX,
    FORUM_COURSE_LIST,
    FORUM_COURSE_ID,
    FORUM_LIST,
    FORUM_LIST_ID,
    FORUM_DISCUSSION_LIST,
    FORUM_POST,
    PROFILE_EDIT,
    PROFILE_EDIT_SCREEN,
    GET_ALL_PHASE_COURSES,
    VIEW_CHAPTER,
    PLAY_VIDEO
} from './types';
import { URI } from '../config/Config';

export const getCourses = (phase='') => {

    return async (dispatch) => {

        const username = await AsyncStorage.getItem('username'); 
        axios.get(`http://${URI.phpServer}/q3api/v1/index.php/Getcourse/enrol_course_id/${username}/${phase}/?deleted_courses_status=true`,reqHeader)
        .then(response => response.data) 
        .then(courses => {
            dispatch({
                type: GET_COURSES,
                payload: courses
            })
        })
        .catch(function (error) { 
        });
    }
}

export const getSessions = () => { 

    return async (dispatch) => {
        const username = await AsyncStorage.getItem('username');  
        axios.get(`http://${URI.nodeServer}:${URI.port}/sessions/?username=${username}`)
        .then(response => response.data)
        .then(sessions => {    
            dispatch ({
                type: GET_SESSION,
                payload: sessions
            });
        })
        .catch(function (error) {

        });
    }
 
} 


export const getCourseOutline = (id) => {  
    return async (dispatch) => { 
        await axios.get(`http://${URI.phpServer}/q3api/v1/index.php/cs/course_by_id?data=${id}&_=${Date.now()}`, reqHeader)
        .then(response => response.data) 
        .then(outline => {  
            dispatch({
                type: COURSE_OUTLINE,
                payload: outline[id]
            });
        })
        .catch(() => {
         
        })
    }
}

export const getBookIndex = (id,cname) => {
    return (dispatch) => {
             axios.get(`http://${URI.phpServer}/coursepack/generate_books/gen_book_html.php?course=${id}`)
            .then(response => response.data)
            .then(index => {   
                dispatch({
                    type: BOOK_INDEX,
                    payload: {cname,index,id}
                });
            })
            .catch(() => {

            })
    }
}

export const seeMore = (desc) => { 
    return {
        type: SEE_MORE,
        payload: desc
    };
};


export const selectBook = (data) => { 
    return {
        type: SELECT_BOOK,
        payload: data
    };
};
 
export const viewBook = () => { 
    return {
        type: VIEW_BOOK,
        payload: ''
    };
};

//Forum
export const getForumCourses = () => { 

    return async (dispatch) => {
    const username = await AsyncStorage.getItem('username');  
    
    const url = `http://${URI.nodeServer}:${URI.port}/forum/app/courselist/?uname=${username}`;
        axios.get(url)
        .then(response => response.data) 
        .then(forum_courses => {
           
            dispatch({
                type: FORUM_COURSE_LIST,
                payload: forum_courses
            })
        })
        .catch(function (error) { 
        
        });
    }
};

export const selectForumCourses = (id, name) =>{
    const c_data = {cid:id,cname:name};
    return {
       type: FORUM_COURSE_ID, 
       payload: c_data  
    };
};


export const getForumLists = (id) => {
    return (dispatch) => { 
      
        axios.get(`http://${URI.nodeServer}:${URI.port}/forum/app/forum/${id}`)
        .then(response => response.data)  
        .then(forumlist => {
            dispatch({ 
                type: FORUM_LIST, 
                payload: forumlist    
            }); 
        })
        .catch(function (error) { 
        
        });
    }
};

export const selectForumid = (fid, cid, cname) =>{
    return {
       type: FORUM_LIST_ID, 
       payload: {f_id : fid, c_id : cid, cname: cname }
    };
};


export const getForumDiscussionLists = (id) => {
    return (dispatch) => { 
      
        axios.get(`http://${URI.nodeServer}:${URI.port}/forum/app/forumposts/${id}`)
        .then(response => response.data)  
        .then(forumdiscussionlist => {
            dispatch({ 
                type: FORUM_DISCUSSION_LIST, 
                payload: forumdiscussionlist    
            }); 
        })
        .catch(function (error) { 
        
        });
    }
};

export const postForums = (userid, disc_id, msg) =>{

    return(dispatch) =>{
        fetch(`http://${URI.nodeServer}:${URI.port}/forum/app/discussion/reply`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                discussionid: disc_id,
                message : msg
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
  
            dispatch({ 
                type: FORUM_POST, 
                payload: responseData    
            }); 
       
        })
        .done();
    }
};


//User Profile

export const getUserData = (uname) => {
    return (dispatch) => { 
      
        axios.get(`http://${URI.nodeServer}:${URI.port}/user?username=${uname}`)
        .then(response => response.data)  
        .then(user_data => {
            dispatch({ 
                type: PROFILE_EDIT, 
                payload: user_data    
            }); 
        })
        .catch(function (error) { 
        
        });
    }
};

export const selectUserEdit = (uname) =>{
    return {
       type: PROFILE_EDIT_SCREEN, 
       payload: uname
    };
};
 export const getAllPhaseCourses = () => { 
    return async (dispatch) => { 
        axios.get(`http://${URI.phpServer}/q3api/v1/index.php/Getcourse/enrol_course_id/?deleted_courses_status=true`, reqHeader)
        .then(response => response.data) 
        .then(phase_courses => { 
            dispatch({
                type: GET_ALL_PHASE_COURSES,
                payload: phase_courses
            });
        })
        .catch(() => {
         
        })
    }
}  
export const ViewChapter = (data,html) => { 
    return {
        type: VIEW_CHAPTER,
        payload: { cname: data.name, html }
    };
}

export const VP = (data) => {
    return {
        type: PLAY_VIDEO,
        payload: data
    };
}
