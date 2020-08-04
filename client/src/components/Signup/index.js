import React,{useState} from 'react'
import {useDispatch} from 'redux-react-hook';
import axios from 'axios';
import * as action from '../../constants/action_type';
import {withRouter} from 'react-router-dom';
import * as routes from '../../constants/routes'
function Signup(props) {
    // Declear our Initial_State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error , setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    // onChange Handler
    const handlerChange = setter => e => {
        setter(e.target.value)
    }
    // submit Handler
    const submit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestBody = {
                query:`
                    mutation {
                        createUser(userInput: {
                            email:"${email}"
                            password: "${password}"
                            confirm: "${confirm}"
                        }) {
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
                const {_id, token, email} = await data.data.createUser;
                dispatch({
                    type:action.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email
                    }
                })
                // store token into localstorage
                localStorage.setItem("token", token);
                // redirect to home screen
                props.history.push(routes.HOME)
            }
        } catch (error) {
            setError(error);
            setLoading(false)
        }
    }
    return (
        <>
            <h1>SignUp</h1>
            <div className="auth-form">
                <form onSubmit={submit}>
                    <input className="form-input" type="email" placeholder="example@example.com" value={email} onChange={handlerChange(setEmail)}/>
                    <input className="form-input" type="password" placeholder="Password" value={password} onChange={handlerChange(setPassword)}/>
                    <input className="form-input" type="password" placeholder="Confirm Password" value={confirm} onChange={handlerChange(setConfirm)}/>

                    <div>
                        <span style={{color: "red", fontSize:13}}>{error || ''}</span>
                    </div>
                    <input className="form-submit" type="submit" value= {loading ? 'Verifying' : "Register"}/>
                </form>
            </div>
        </>
    )
}
export default withRouter(Signup);
