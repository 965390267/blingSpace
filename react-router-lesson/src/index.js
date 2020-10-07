import React from 'react';
import ReactDOM,{render} from 'react-dom';

import {BrowserRouter as Router,Route,Redirect,Switch,NavLink} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import User from './pages/User';
import Login from './pages/Login';
import Protected from './Protected';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';


render(
  <Router>
    <>

      <App>
        <Switch>
          <Route exact={true} path="/" component={Home}></Route>
          <Route path="/user" component={User}></Route>
          <Protected path="/profile" component={Profile}></Protected>
          <Route path="/login" component={Login}></Route>
          <Redirect to="/" />
        </Switch>
      </App>

    </>
  </Router>
  ,
  window.root
)


