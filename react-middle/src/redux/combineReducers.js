let combineReducers = (reducers,initState = {}) => {
    return function (state=initState,action) {
        let newState = {

        };
        for (const key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                newState[key] = reducers[key](state[key],action);
                
            }
        }
        return newState;
    }
}

export default combineReducers;