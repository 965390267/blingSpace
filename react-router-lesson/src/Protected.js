import React, { Component } from 'react';
import {Redirect,Route} from 'react-router-dom';
// route 中可以放置component  也可以放置render 将render函数返回值设置为对应组件
let Protected = ({
    component:Component,...props
}) => {
    // return <Route {...props} path="path" component={Component} />
    return <Route {...props} render={(p)=>{
        return localStorage.getItem('login') ? <Component {...p}/> : <Redirect to="/login"/>
    }} />
}

export default Protected;