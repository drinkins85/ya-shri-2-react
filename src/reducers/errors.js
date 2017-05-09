const initialState = [];

export default function errors (state = initialState, action){
    switch (action.type) {
        case 'ADD_ERROR':
            return [...state, action.payload];

        case 'DELETE_ERRORS':
            return [];

        default:
            return state;
    }
}