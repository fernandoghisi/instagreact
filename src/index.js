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

function verificaAutenticacao(nextState, replace) {
  if (localStorage.getItem('auth-token') == null) {
    replace('/?msg=você precisa estar logado para acessar o endereço');
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/timeline" component={App} onEnter={verificaAutenticacao}/>
      <Route path="/logout" component={Logout}/>
    </Router>
  ),
  document.getElementById('root')
);
//registerServiceWorker();