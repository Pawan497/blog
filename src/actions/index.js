// import axios from "axios";
import _ from "lodash";
import jsonPlaceholder from "../api/jsonPlaceholder";

export const fetchPostsAndUsers = () => async ( dispatch, getState) => {
    // console.log("About to fetch Post");
    await dispatch(fetchPosts());    
    
    // const userIds = _.uniq(_.map(getState().posts, "userId"));
    // // console.log("Fetched Post!", getState().posts);
    // // console.log(userIds);
    // userIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map("userId")
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value(); //essential 
};

// export const fetchPosts = () => {

    // return async (dispatch/*, getState*/) => {
//     const response = await jsonPlaceholder.get("/posts");

//     dispatch({
//         type: 'FETCH_POSTS',
//         payload: response
//     });
//  };
// };

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({
        type: "FETCH_POSTS",
        payload: response.data
    });
 };

 //Memoization Approach
//  export const fetchUser = (id) => dispatch => {
//     _fetchUser( id, dispatch);
// }

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
    
//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     });
    
//  });



 export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    
    dispatch({
        type: "FETCH_USER",
        payload: response.data
    });
    
 };
