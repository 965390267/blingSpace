import {ADD} from '../action-types';


export let add = (val) =>{
    return {
        type: ADD,
        num: val
    }
}