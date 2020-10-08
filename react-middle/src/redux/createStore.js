export default function (reducer) {
    let state;
    function getState() {
        return state;
    }
    let listens = [];
    function subscribe(fn) {
        listens.push(fn);
        return () => {
            listens = listens.filter(f => f!=fn)
        }
    }
    function dispach(action) {
        state = reducer(state,action);
        listens.forEach(fn=>fn())
    }

    return {
        getState,
        subscribe,
        dispach
    }
}