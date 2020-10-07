import React, { Component } from 'react';
import {Route} from 'react-router-dom';

let MenuLink = ({
    to,...p
}) => {
    return (
        <Route path={to} {...p} children={()=>{
            return <div
            style = {{
                color: 'white'
            }}
            className={
                props.match ? 'active':''
            }
            onClick={()=>{
                props.history.push(to)
            }}
            >
                {p.children}
            </div>
        }}
        />
    )
}

export default MenuLink;
