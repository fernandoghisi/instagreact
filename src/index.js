import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import Login from './components/Login';
import { Router, Route, browserHistory } from 'react-router';
//import registerServiceWorker from './registerServiceWorker';

function verificaAutenticacao(nextState, replace) {
  if (localStorage.getItem('auth-token') == null) {
    replace('/');
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/timeline" component={App} onEnter={verificaAutenticacao}/>
    </Router>
  ),
  document.getElementById('root')
);
//registerServiceWorker();