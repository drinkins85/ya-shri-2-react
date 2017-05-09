const initialState = null;

export default function lectionsFilter(state = initialState, action){
    if (action.type === 'FILTER_LECTION'){
        return action.payload
    }
    if (action.type === 'FILTER_LECTION_CLEAR'){
        return null
    }
    return state;
}