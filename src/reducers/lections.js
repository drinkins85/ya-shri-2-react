const initialState = [
    {
        id : 1,
       theme: "Лекция 2. Работа с сенсорным пользовательским вводом",
        dateStart : new Date(2017, 4, 8, 10 ),
        dateFinish : new Date(2017, 4, 8, 12 ),
        classroom: {
            id: 1,
            title: 'Синий кит',
            capacity: 75,
            description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
        },
        teacher:  {
            id: 1,
            firstName: 'Дмитрий',
            lastName: 'Душкин',
            company: 'Яндекс',
            description: 'Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013.'
        },
        schools: [
            {
                id: 1,
                title: 'Школа мобильного дизайна',
                amount: 30
            },
            {
                id: 2,
                title: 'Школа мобильной разработки',
                amount: 45
            }
        ]
    },
    {
        id: 2,
        theme: "Лекция 5. Клиентская оптимизация: базовые знания и лучшие практики",
        dateStart : new Date(2017, 4, 12, 10 ),
        dateFinish : new Date(2017, 4, 12, 12 ),
        classroom: {
            id: 1,
            title: 'Синий кит',
            capacity: 75,
            description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
        },
        teacher: {
            id: 2,
            firstName: 'Андрей',
            lastName: 'Морозов',
            company: 'Яндекс',
            description: 'Веб-разработчик в Яндексе с 2005 года'
        },
        schools: [
            {
                id: 1,
                title: 'Школа мобильного дизайна',
                amount: 30
            },
            {
                id: 3,
                title: 'Школа разработки интерфейсов',
                amount: 50
            }
        ]
    },
    {
        id: 3,
        theme: "Лекция 6. Клиентская оптимизация: мобильные устройства и инструменты",
        dateStart : new Date(2017, 4, 20, 19 ),
        dateFinish : new Date(2017, 4, 20, 21 ),
        classroom: {
            id: 2,
            title: 'Экстрополис',
            capacity: 95,
            description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
        },
        teacher: {
            id: 3,
            firstName: 'Сергей',
            lastName: 'Бережной',
            company: 'Яндекс',
            description: 'Веб-разработчик в Яндексе с 2005 года'
        },
        schools: [
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
        ]
    },
    {
        id: 4,
        theme: "Лекция 8. Инструменты разработки мобильного фронтенда",
        dateStart : new Date(2017, 4, 20, 19 ),
        dateFinish : new Date(2017, 4, 20, 21 ),
        classroom: {
            id: 2,
            title: 'Экстрополис',
            capacity: 95,
            description: "Подъехать к офису Яндекса можно по улице Льва Толстого или Тимура Фрунзе, ориентируясь на указатели с логотипом компании."
        },
        teacher: {
            id: 1,
            firstName: 'Дмитрий',
            lastName: 'Душкин',
            company: 'Яндекс',
            description: 'Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013.'
        },
        schools: [
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
        ]
    }
];

export default function classrooms(state = initialState, action){
    switch (action.type) {
        case 'ADD_LECTION':
            return [...state, action.payload];

        case 'DELETE_LECTION':
            return state.filter(lection => lection.id !== action.payload);

        case 'EDIT_LECTION':
            return state.map(lection => {
                if (lection.id === action.payload.id){
                    lection.theme = action.payload.theme;
                    lection.dateStart = action.payload.dateStart;
                    lection.dateFinish = action.payload.dateFinish;
                    lection.classroom = action.payload.classroom;
                    lection.teacher = action.payload.teacher;
                    lection.schools = action.payload.schools;
                }
                return lection
            });
           return state;

        default:
            return state;
    }
}