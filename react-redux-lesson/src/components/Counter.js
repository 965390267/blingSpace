import React, { Component } from 'react';
import {add,minus} from '../store/actions/counter';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

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

// let bindActionCreators = (actions,dispatch)=>{
//     let obj = {};
//     for (const key in actions) {
//             obj[key] = dispatch(actions[key](...args));
//     }
//     return obj;
// }

let mapStateToProps = (state)=>{
    return {
        number:state.counter.number
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
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// export default Counter;
