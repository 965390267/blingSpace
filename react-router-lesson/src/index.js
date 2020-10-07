import React from 'react';
import ReactDOM,{render} from 'react-dom';

import {BrowserRouter as Router,Route,Redirect,Switch,NavLink} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import User from './pages/User';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';


render(
  <Router>
    <>

      <App>
        <Switch>
          <Route exact={true} path="/" component={Home}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Redirect to="/" />
        </Switch>
      </App>

    </>
  </Router>
  ,
  window.root
)


