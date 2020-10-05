import React, {Component} from 'react';
import MessageItem from './MessageItem';
export default class MessageBox extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props.messageList);
        return (
           <>
            {
                this.props.messageList.map((item,key) => {

                    return (
                        <MessageItem key={key} {...item}></MessageItem>
                    )
                })
            }
           </>
        )
    }
}