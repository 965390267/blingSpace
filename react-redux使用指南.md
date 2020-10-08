### 公共区域
在最外层添加生产者，并传递store
```js
import {Provider} from 'react-redux';
  <Provider store={store}>
    <Counter></Counter>
    {/* <Todo></Todo> */}
  </Provider>
```
消费者组件中引入connect高阶函数，及引入actions函数包裹对象
```react
import {connect} from 'react-redux';
import * as actions from '../store/actions/counter';
```
### 第一版
```react

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

```

### 第二版

```react
import {bindActionCreators} from 'redux';

export default connect((state)=>{
    return {
        number:state.counter.number
    }
}, (dispatch)=>bindActionCreators(actions,dispatch))(Counter);
```
实现如下
```js

let bindActionCreators = (actions,dispatch)=>{
    let obj = {};
    for (const key in actions) {
            obj[key] = dispatch(actions[key](...args));
    }
    return obj;
}
```

### 第三版

```react

export default connect((state)=>{
    return {
        number:state.counter.number
    }
}, actions)(Counter);
```