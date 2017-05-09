const initialState = [
    {
        id: 1,
        title: 'Синий кит',
        capacity: 75,
        description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
    },
    {
        id: 2,
        title: 'Экстрополис',
        capacity: 95,
        description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
    }

];

export default function classrooms(state = initialState, action){
    switch (action.type) {
        case 'ADD_CLASSROOM':
            return [...state, action.payload];

        case 'DELETE_CLASSROOM':
            return state.filter(classroom => classroom.id !== action.payload);

        case 'EDIT_CLASSROOM':
            return state.map(classroom => {
                if (classroom.id === action.payload.id){
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