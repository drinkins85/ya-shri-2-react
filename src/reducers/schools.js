const initialState = [];

export default function schools(state = initialState, action){
    switch (action.type) {
        case 'LOAD_SCHOOLS_DATA_SUCCESS':
            return action.payload;
        case 'ADD_SCHOOL':
            return [...state, action.payload];

        case 'DELETE_SCHOOL':
            return state.filter(school => school._id !== action.payload);

        case 'EDIT_SCHOOL':
            return state.map(school => {
                if (school._id === action.payload.id){
                    school.title = action.payload.title;
                    school.amount = action.payload.amount;
                }
                return school
            });

        default:
            return state;
    }
}