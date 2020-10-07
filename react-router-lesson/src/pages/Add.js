import React, { Component } from 'react';

export default class Add extends Component {
  input = React.createRef()
  handleSubmit = (e)=>{
    e.preventDefault();
    let username = this.input.current.value;
    let lists = JSON.parse(localStorage.getItem('lists')) || [];
    lists.push({
        username: username,
        id: Math.random()
    })
    localStorage.setItem('lists',JSON.stringify(lists));

    this.props.history.push('/user/list')
  }
  render() {
      console.log(this.props);
    return (
        <div>
           <form onSubmit={this.handleSubmit}>
                <input ref={this.input} required type="text" className="form-control" />
                <button className="btn btn-primary">添加</button>
           </form>
        </div>
    );
  }
}
