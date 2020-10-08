import React, { Component } from 'react';
import store from '../store/index';
import {add,minux} from '../store/actions/counter';

class Counter extends Component {
    state = {
        number:store.getState().number
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({
                number:store.getState().number
            })
        })
    }
    handleAdd = () =>{
        store.dispatch(add(3));
    }
    handleMinus = () =>{
        store.dispatch(minux(2));
    }
    render() {
        return (
        <div>

            <button onClick={this.handleAdd} id="add">+</button>
            <button onClick={this.handleMinus} id="minus">-</button>
            {
                this.state.number
            } </div>
        );
    }
}

export default Counter;
