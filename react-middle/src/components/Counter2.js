import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
class Counter1 extends Component {
    handleClick = () => {
        this.props.add(4)
    }
    render() {
        return (
            <div>
                <p> {this.props.number} </p>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
};

export default connect(
    (state)=>state.counter2,
    actions
)(Counter1)