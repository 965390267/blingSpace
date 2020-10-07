import React, { Component } from 'react';
import SliderBar from '../components/SliderBar';
import {
  Switch,Route
} from 'react-router-dom';
import List from '../pages/List';
import Add from '../pages/Add';
import UserDetail from '../pages/UserDetail';


export default class User extends Component {
    state = {
        sliderBarData: [
            {
                path: '/user/add',
                content: '用户添加'
            },
            {
                path: '/user/list',
                content: '用户详情'
            }
        ]
    }
  render() {
    return (
      <div>
          <div className="col-md-3">
            <SliderBar sliderBarData={this.state.sliderBarData}></SliderBar>
          </div>
          <div className="col-md-9">
            <Switch>
                <Route path="/user/add" component={Add}/>
                <Route path="/user/list" component={List}/>
                <Route path="/user/detail/:uid" component={UserDetail}/>
            </Switch>
          </div>
      </div>
    );
  }
}
