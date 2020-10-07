import React, { Component } from 'react';
import {NavLink,Route} from 'react-router-dom';

let withRoute = (component) => {
    return () => {
        return <Route component={component} />
    }
}

class Nav extends Component {
    state = {

    }
    handleClick = () => {
        console.log(this.props);
    }
    render() {
        console.log(this.props);
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header"></div>
                    <a className="navbar-brand">
                        路由系统
                    </a>
                </div>
                <div className="nav navbar-nav">
                    <li><NavLink exact={true} to='/'>首页</NavLink></li>
                    <li> <NavLink to='/user'>用户</NavLink></li>
                    <li><NavLink to='/profile'>文章</NavLink></li>
                </div>
            </nav>

        );
    }
}
export default withRoute(Nav);