export function addLection(theme, dateStart, dateFinish, classroom, teacher, schools) {
    let newLection = {
        id: Date.now(),
        theme: theme,
        dateStart: dateStart,
        dateFinish: dateFinish,
        classroom: classroom,
        teacher: teacher,
        schools: schools
    };
    return {
        type: 'ADD_LECTION',
        payload: newLection
    }
}

export function deleteLection(id) {
    return {
        type: 'DELETE_LECTION',
        payload: id
    }
}

export function editLection(id, theme, dateStart, dateFinish, classroom, teacher, schools) {
    return {
        type: 'EDIT_LECTION',
        payload: {id, theme, dateStart, dateFinish, classroom, teacher, schools}
    }
}

export function filterLection(filter) {
    return {
        type: 'FILTER_LECTION',
        payload: filter
    }
}

export function filterLectionClear() {
    return {
        type: 'FILTER_LECTION_CLEAR',
    }
}


