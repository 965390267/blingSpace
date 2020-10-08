import React, { Component } from 'react';
import {connect} from '../react-redux';
import * as actions from '../store/actions';
class Counter1 extends Component {
    handleClick = () => {
        this.props.add(4)
    }
    render() {
    
        console.log(this.props);
        return (
            <div>
                <p> {this.props.number} </p>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
};

export default connect(
    (state)=>state.counter1,
    actions
)(Counter1)