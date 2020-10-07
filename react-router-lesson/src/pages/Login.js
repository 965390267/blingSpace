import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
        <div>
            <button onClick={()=>{
                localStorage.setItem('login',true)
            }}>登录</button>
            <button onClick={()=>{
                localStorage.removeItem('login')
            }}>取消登录</button>
        </div>
    );
  }
}

export default Login;
