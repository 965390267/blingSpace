export default function (actions,dispatch) {
    let newActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            newActions[key] = (...args) => {
                dispatch(actions[key](args))
            }
            
        }
    }
    return newActions
}