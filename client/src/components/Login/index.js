import React, { useState } from 'react'
import axios from 'axios';
import {useDispatch} from 'redux-react-hook';
import {withRouter} from 'react-router-dom';
import * as action from '../../constants/action_type';
import * as routes from '../../constants/routes';
function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // onChange Handler
    const onHandlerChnange = setter => e => {
        setter(e.target.value);
    }
    // Form Submit Handler
    const submit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestBody = {
                query:`
                    query{
                        login(
                            email: "${email}"
                            password: "${password}"
                        ){
                            _id
                            token
                            email
                        }
                    }
                `
            };
            // retrive Data from server
            const {data} = await axios.post("http://localhost:5000/graphql", requestBody);
            if(data.errors) {
                setError(data.errors[0].message);
                setLoading(false);
            } else {
                setError(null);
                setLoading(false);
                const {_id, email, token } = await data.data.login;
                dispatch({
                    type: action.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email
                    }
                });
                // store token into LocalStorage
                localStorage.setItem("token", token);
                // redirect to home screen
                props.history.push(routes.HOME);
            }
            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    return (
        <>
            <h1>Login</h1>
                <div className="auth-form">
                    <form onSubmit={submit}>
                        <input className="form-input" type='email' placeholder="example@example.com" value={email} onChange={onHandlerChnange(setEmail)}/>
                        <input className="form-input" type="password" placeholder="Password" value={password} onChange={onHandlerChnange(setPassword)}/>
                        <div>
                            <span style={{color: "red", fontSize:13}}>
                                {error || ""}
                            </span>
                        </div>
                        <input className="form-submit" type="submit" value={loading ? "Verifying" : "Login"}/>
                    </form>
                </div>
        </>
    )
}
export default withRouter(Login);
