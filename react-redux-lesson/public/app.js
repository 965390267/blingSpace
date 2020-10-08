let createStore = (reducer) => {
    let state;
    let dispatch = (action)=>{
        state = reducer(state,action);
        listeners.forEach(fn=>fn())
    }
    dispatch({})
    let getState = ()=>JSON.parse(JSON.stringify(state));

    let listeners = [];
    let subscribe = (fn)=>{
        listeners.push(fn);
        return ()=>{
            // 取消订阅函数
            listeners = listeners.filter(f=>f!=fn)
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

let initState = {
    title: {
        content: '你好',
        color: 'yellow'
    },
    content: {

    }

}
function reducer(state=initState,action) {
    switch (action.type){
        case "changeTitleColor":
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
    }

    return initState;
}

let store = createStore();

store.subscribe(render)
let state = store.getState();


function render() {

    console.log(state);

}
render()
setTimeout(() => {
    store.dispatch({
        type:'changeTitleColor',
        color: 'white'
    })
    render()
}, 1000);