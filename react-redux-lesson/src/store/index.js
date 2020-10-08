// import {createStore,combineReducers} from '../history/redux';
import {createStore,combineReducers} from 'redux';
import todo from './reducers/todo.js';
import counter from './reducers/index.js';


let reducer = combineReducers({
    counter,todo
})
let store = createStore(reducer);

export default store