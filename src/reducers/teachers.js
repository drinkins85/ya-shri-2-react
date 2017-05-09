const initialState = [
    {
        id: 1,
        firstName: 'Дмитрий',
        lastName: 'Душкин',
        company: 'Яндекс',
        description: 'Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013.'
    },
    {
        id: 2,
        firstName: 'Андрей',
        lastName: 'Морозов',
        company: 'Яндекс',
        description: 'Веб-разработчик в Яндексе с 2005 года'
    },
    {
        id: 3,
        firstName: 'Сергей',
        lastName: 'Бережной',
        company: 'Яндекс',
        description: 'Веб-разработчик в Яндексе с 2005 года'
    }

];

export default function teachers(state = initialState, action){
    switch (action.type) {
        case 'ADD_TEACHER':
            return [...state, action.payload];

        case 'DELETE_TEACHER':
            return state.filter(teacher => teacher.id !== action.payload);

        case 'EDIT_TEACHER':
            return state.map(teacher => {
                if (teacher.id === action.payload.id){
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