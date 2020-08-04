import React, {useCallback} from 'react';
import {useMappedState} from 'redux-react-hook'
import NonAuthHome from './nonauth';
import AuthHome from './auth';
function Home() {
    const mapState = useCallback((state) => ({
        
        authUser: state.sessionState.authUser
    }),[]);
    const {authUser} = useMappedState(mapState);
    return authUser ? <AuthHome /> : <NonAuthHome />
}
export default Home;