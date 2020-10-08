let initState = {
    number: 0
}
export default function (state = initState,action) {
    switch (action.type) {
        case 'add':
            return {...state,number:state.number+action.num}
    
        default:
            break;
    }
    return state;
}