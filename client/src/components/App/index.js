import React,{useCallback} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as routes from '../../constants/routes';
import Home from '../Home';
import NotFound from '../../NotFound';
import Login from '../Login';
import Signup from '../Signup';
import Navigation from '../Navigation'
import useWithAuthenticate from '../WithAuthenticate';
import {useMappedState} from 'redux-react-hook'
function App() {
  useWithAuthenticate();
  const mapState = useCallback((state) => ({
    loading: state.sessionState.loading
  }),[]);
  const {loading} = useMappedState(mapState)
    if(loading) {
      return (
        <h1>Loading........</h1>
      )
    }
  return (
    <Router>
    <div className="App">
      <Navigation />
      <header className="App-header">
        <Switch>
          <Route exact path={routes.HOME} component={() => <Home />}/>
          <Route exact path={routes.LOGIN} component={() => <Login />}/>
          <Route exact path={routes.SIGN_UP} component={() => <Signup />}/>
          <Route component={NotFound}/>
        </Switch>
      </header>
    </div>
    </Router>
  
  );
}

export default App;
