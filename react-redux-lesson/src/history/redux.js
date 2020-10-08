let createStore = (reducer)=>{

    let state;
    let listeners = [];
    let getState = () =>state;
    let dispatch = (action) => {
        state = reducer(state,action)
        listeners.forEach(listener=>listener())
    }
    dispatch({})
    let subscribe = (fn) => {
        listeners.push(fn)
        return () => {
            listeners = listeners.filter(f => f != fn)
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}
let combineReducers = (reducers)=>{
    return (state = {},action) =>{
        for (const key in reducers) {
                state[key] = reducers[key](state[key],action);
        }
        return state;
    }
}
export {
    createStore,
    combineReducers
}

