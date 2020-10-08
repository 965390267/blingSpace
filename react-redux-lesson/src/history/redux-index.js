import {createStore} from './redux';


let initState = {
  number: 0
}
const ADD = 'ADD';
const MINUS = 'MINUS';

function reducer(state = initState,action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        number: action.count + state.number
      }
    case MINUS:
      return {
        ...state,
        number:  state.number - action.count
      }

    default:
      break;
  }
  return state;
}
let store = createStore(reducer);
window.store = store;
let fn = () => {
  window.root.innerHTML = store.getState().number
}
store.subscribe(fn);
fn();
window.add.onclick=function () {

  store.dispatch({
    type: ADD,
    count: 3
  });
}
window.minus.onclick=function () {
  store.dispatch({
    type: MINUS,
    count: 2
  });
}