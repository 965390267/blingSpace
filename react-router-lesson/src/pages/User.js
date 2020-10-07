import React, { Component } from 'react';
import SliderBar from '../components/SliderBar';
import {
  Switch,Route
} from 'react-router-dom';
import List from '../pages/List';
import Add from '../pages/Add';


export default class User extends Component {
    state = {
        sliderBarData: [
            {
                path: '/user/add',
                content: '用户添加'
            },
            {
                path: '/user/detail',
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
                <Route path="/user/detail" component={List}/>
            </Switch>
          </div>
      </div>
    );
  }
}
