import React,{Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Consumer} from '../context';


moment.locale('zh-cn')
export default class MessageItem extends Component {

    render() {
        let {
            avatar,
            message,
            time
        } = this.props;
        return (
            <Consumer>
                {
                    (obj)=>{
                        console.log(obj);
                        return <div className="media">
                                <div className="media-left">
                                    <img className="" src={avatar}/>
                                </div>
                                <div className="media-body">
                                <h4 className="media-heading">{message}</h4>
                                    <span>{moment(time).fromNow()}</span>
                                    {/* <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span> */}
                                </div>
                                <hr/>
                                <button className="btn btn-success" onClick={obj.add}>点赞</button>
                            </div>

                    }
                }
            </Consumer>
          )
    }

}