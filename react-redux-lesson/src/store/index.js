import {createStore} from '../history/redux';
import reducer from './reducers/todo.js';


let store = createStore(reducer);

export default store