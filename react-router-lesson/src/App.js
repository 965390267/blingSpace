import React, { Component } from 'react';
import Nav from './components/Nav'


export default class App extends Component {
  render() {
    return (
      <div>
          <Nav></Nav>
          {
              this.props.children
          }
      </div>
    );
  }
}
