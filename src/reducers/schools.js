const initialState = [
    {
        id: 1,
        title: 'Школа мобильного дизайна',
        amount: 30
    },
    {
        id: 2,
        title: 'Школа мобильной разработки',
        amount: 45
    },
    {
        id: 3,
        title: 'Школа разработки интерфейсов',
        amount: 50
    }
];

export default function schools(state = initialState, action){
    switch (action.type) {
        case 'ADD_SCHOOL':
            return [...state, action.payload];

        case 'DELETE_SCHOOL':
            return state.filter(school => school.id !== action.payload);

        case 'EDIT_SCHOOL':
            return state.map(school => {
                if (school.id === action.payload.id){
                    school.title = action.payload.title;
                    school.amount = action.payload.amount;
                }
                return school
            });

        default:
            return state;
    }
}