import React,{useEffect} from "react";
import { useDispatch } from 'redux-react-hook';
import axios from 'axios';
import * as action from '../../constants/action_type';
async function authenticate(dispatch) {
    // retrive token for local storage
    const token = localStorage.getItem("token");
    if(!token) {
        try {
            const requestBody = {
                query:`
                        query{
                            verifyToken(
                                token:"${token}"
                            ){
                                _id
                                email
                            }
                        }
                `
            };
            // retrive data from server
            const {data} = await axios.post("http://localhost:5000/graphql", requestBody);
            const user = await data.data.verifyToken;
                if(user) {
                    dispatch({
                        type:action.SET_AUTH_USER,
                        authUser : {
                            _id: user._id,
                            email: user.email
                        }
                    })
                } else {
                    dispatch({
                        type:action.SET_AUTH_USER,
                        authUser: null
                    })
                    localStorage.removeItem('token')
                }
        } catch {
            dispatch({type: action.SET_AUTH_USER, authUser: null});
        }
    } else {
        dispatch({type: action.SET_AUTH_USER, authUser: null});
    }

}
function useWithAuthenticate() {
    const dispatch = useDispatch();
    useEffect(() => {
        authenticate(dispatch)
    },[]);
}
export default useWithAuthenticate;