import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Nav from './components/Nav'


export default class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Nav}/>
          {
              this.props.children
          }
      </div>
    );
  }
}
