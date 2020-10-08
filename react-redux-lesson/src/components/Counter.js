import React, { Component } from 'react';
import * as actions from '../store/actions/counter';
import {connect} from '../react-redux';
import {bindActionCreators} from 'redux';
let {add,minus} = actions;

class Counter extends Component {
    state = {
       number: this.props.number
    }
    // componentDidMount(){
    //     store.subscribe(()=>{
    //         this.setState({
    //             number:store.getState().counter.number
    //         })
    //     })
    // }
    handleAdd = () =>{
        this.props.add(3);
    }
    handleMinus = () =>{
        this.props.minus(2);
    }
    render() {
        return (
        <div>

            <button onClick={this.handleAdd} id="add">+</button>
            <button onClick={this.handleMinus} id="minus">-</button>
            {
               this.props.number
            } </div>
        );
    }
}



let mapDispatchToProps = (dispatch)=>{
    return {
        add(val){
            dispatch(add(val))
        },
        minus(val){
            dispatch(minus(val))
        }
    }
}

// let bindActionCreators = (actions,dispatch) => {
//     let obj = {};
//     for (const key in actions) {
//         if (actions.hasOwnProperty(key)) {
//             obj[key] = (...args)=>dispatch(actions[key](...args));     
//         }
//     }
//     return obj
// }
export default connect((state)=>{
    return {
        number:state.counter.number
    }
}, actions)(Counter);
// export default Counter;
