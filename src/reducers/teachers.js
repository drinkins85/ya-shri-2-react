const initialState = [];

export default function teachers(state = initialState, action){
    switch (action.type) {
        case 'LOAD_TEACHERS_DATA_SUCCESS':
            return action.payload;
        case 'ADD_TEACHER':
            return [...state, action.payload];

        case 'DELETE_TEACHER':
            return state.filter(teacher => teacher._id !== action.payload);

        case 'EDIT_TEACHER':
            return state.map(teacher => {
                if (teacher._id === action.payload.id){
                    teacher.firstName = action.payload.firstName;
                    teacher.lastName = action.payload.lastName;
                    teacher.company = action.payload.company;
                    teacher.description = action.payload.description;
                }
                return teacher
            });

        default:
            return state;
    }
}