import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './store';

import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';


ReactDOM.render(
  <Provider store={store}>
   <Fragment>
      <Counter1 />
      <hr/>
      {/* <Counter2 /> */}
   </Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
