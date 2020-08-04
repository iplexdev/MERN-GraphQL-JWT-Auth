import React, {useCallback} from 'react';
import {useMappedState} from 'redux-react-hook'
import NonAuthNavigator from './nonAuth';
import AuthNavigator from './auth';
function Navigation() {
    const mapState = useCallback((state) => ({
        
        authUser: state.sessionState.authUser
    }),[]);
    const {authUser} = useMappedState(mapState);
    return authUser ? <AuthNavigator /> : <NonAuthNavigator />
}
export default Navigation;