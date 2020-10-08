import * as Types from '../action-types';

let addTodo = (todo) => {
    return {
        type : Types.ADD_TODO,
        todo : todo
    }
}
let removeTodo = (index) => {
    return {
        type : Types.REMOVE_TODO,
        index
    }
}

export {
    addTodo,
    removeTodo
}