import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import { Router, Route, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';
//import registerServiceWorker from './registerServiceWorker';

function verifyAuth(nextState, replace) {
  //console.log(nextState);
  const result = matchPattern('/timeline(/:login)', nextState.location.pathname);
  const privateEndpoint = result.paramValues[0] === undefined;
  if (privateEndpoint && localStorage.getItem('auth-token') === null) {
    replace('/?msg=você precisa estar logado para acessar o endereço');
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/timeline(/:login)" component={App} onEnter={verifyAuth}/>
      <Route path="/logout" component={Logout}/>
    </Router>
  ),
  document.getElementById('root')
);
//registerServiceWorker();