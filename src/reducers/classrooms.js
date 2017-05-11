const initialState = [];

export default function classrooms(state = initialState, action){
    switch (action.type) {
        case 'LOAD_CLASSROOMS_DATA_SUCCESS':
            return action.payload;
        case 'ADD_CLASSROOM':
            return [...state, action.payload];

        case 'DELETE_CLASSROOM':
            return state.filter(classroom => classroom._id !== action.payload);

        case 'EDIT_CLASSROOM':
            return state.map(classroom => {
                if (classroom._id === action.payload.id){
                    classroom.title = action.payload.title;
                    classroom.capacity = action.payload.capacity;
                    classroom.description = action.payload.description;
                }
                return classroom
            });

        default:
            return state;
    }
}