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

export {
    createStore
}

