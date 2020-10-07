import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class List extends Component {
  state = {
    users: JSON.parse(localStorage.getItem('lists')) || []

  }
  render() {
    return (
      <table className="table table-borderd">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.users.map((user,index)=>{
              return <tr key={index} >
                  <td>
                    <Link to={{
                      pathname: '/user/detail/' + user.id,
                      state:user.username
                    }}>{user.id}</Link>
                  </td>
                  <td>{user.username}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    );
  }
}
