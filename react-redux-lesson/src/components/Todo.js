import React, { Component } from 'react';
import store from '../store';
import * as actions from '../store/actions/todo';

window.store = store
class Todo extends Component {
  input = ''
  state = {
    todos: store.getState().todo
  }
  componentDidMount(){
    store.subscribe(()=>{
      this.setState({
        todos: store.getState().todo
      })
    })
  }
  handleClick = () => {
    console.log(this.input.value);
    store.dispatch(actions.addTodo(this.input.value))
  }
  render() {
    return (
      <div>
        <input  ref={
          (dom)=>{this.input = dom}
        } type="text" />
        <button onClick={this.handleClick}>add</button>
        <ul>
        {
          this.state.todos.map((todo)=>{
            return <li> {todo} </li>
          })
        }
        </ul>
      </div>
    );
  }
}

export default Todo;
