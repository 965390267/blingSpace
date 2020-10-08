import * as Types from '../action-types';
let initState = {
    number: 0
}


function reducer(state = initState,action) {
    switch (action.type) {
      case Types.ADD:

        return {
          ...state,
          number: action.count + state.number
        }
      case Types.MINUS:
        return {
          ...state,
          number:  state.number - action.count
        }

      default:
        break;
    }
    return state;
  }
export default reducer