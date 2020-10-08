import {ADD,MINUS} from '../action-types';


// actionCreator
export function add(n) {
    return {
        type: ADD,
        count: n
      }
}
export function minus(n) {
    return {
        type: MINUS,
        count: n
      }
}