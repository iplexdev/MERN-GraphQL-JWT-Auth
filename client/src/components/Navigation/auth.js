import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';
import {useDispatch} from 'redux-react-hook';
import * as action from '../../constants/action_type';
function AuthNavigator(){
    const dispatch = useDispatch();
    function logout() {
        dispatch({
            type: action.SET_AUTH_USER,
            authUser: null
        });
        localStorage.removeItem('token');
    }
    return (
        <div className="navbar">
          <div className="navbar-left">
            <Link to={routes.HOME}>HOME</Link>
          </div>
          <div className="navbar-right">
           <Link to={routes.HOME} onClick={logout}>LOGOUT</Link>
          </div>
        </div>
      )
}
export default AuthNavigator;