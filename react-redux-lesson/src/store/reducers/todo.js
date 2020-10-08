import * as Types from '../action-types';


function render(state=[],action){
    switch (action.type) {
        case Types.ADD_TODO:
            return [
                action.todo,...state
            ]
        case Types.REMOVE_TODO:
            return state.filter((todo,index)=>{
               return index != action.index
            })
        default:
            break;
    }
    return state
}

export default render