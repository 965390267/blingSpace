import React, {Component} from 'react';


export default class MessageInput extends Component {
    val = React.createRef()
    handleClick = () => {
        this.props.addMessage(this.val.current.value);
        this.val.current.value = ""
    }
    render() {
        return (
        <div className="form-group">
            <input type="text" className="form-control" ref={this.val}/>
            <button className="btn btn-danger" onClick={this.handleClick}>
                添加留言
            </button>
        </div>
        )
    }
}