import React, {Component} from 'react';
import ReactDom,{render} from 'react-dom';

import MessageBox from './components/MessageBox';
import MessageInput from './components/MessageInput';

import 'bootstrap/dist/css/bootstrap.css';
import axios from './axios';

import {Consumer,Provider} from './context';
class App extends Component {
    state = {
        messageList: [],
        total: 0
    }
    // 在此获取数据 获取后把数据传递给messageBox
    componentWillMount(){
    }
    async componentDidMount() {
       try {
            let data = await axios.get('/user.json');
            console.log(data);
            this.setState({
                messageList: data
            })
       } catch (error) {
            console.log("======",error);
       }
    }
    add = ()=>{
        this.setState({
            total:this.state.total+1
        })
    }
    addMessage = (val) => {
        let m = {
            avatar: 'http://pic.sc.chinaz.com/Files/pic/pic9/202009/apic28073_s.jpg',
            message:val,
            time: Date.now()
        }
        this.setState({
            messageList: [
                ...this.state.messageList,m
            ]
        })
    }
    render() {
        console.log('render')
       return (
            <Provider value={{
                add:this.add,
                a:1
            }}>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Panel title</h3>
                        </div>
                        <div className="panel-body">
                        <MessageBox messageList={this.state.messageList}></MessageBox>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <MessageInput addMessage={this.addMessage}></MessageInput>
                    </div>

                    <h2>总点赞数 {this.state.total} </h2>
                </div>

            </Provider>
        )
    }
}

render(
    <App></App>,
    window.root
)