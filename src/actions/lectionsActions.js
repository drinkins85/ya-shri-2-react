import store from '../store/mlab-api';

export function addLection(theme, dateStart, dateFinish, classroom, teacher, schools) {
    return dispatch => {
        let newLection = {
            _id: Date.now(),
            theme: theme,
            dateStart: dateStart,
            dateFinish: dateFinish,
            classroom: classroom,
            teacher: teacher,
            schools: schools
        };
        store.put('lections2', JSON.stringify(newLection))
            .then(() => {
                dispatch({type: 'ADD_LECTION', payload: newLection})
            });
    }
}

export function deleteLection(id) {
    return dispatch => {
        store.delete('lections2', id)
            .then(() => {
                dispatch({type: 'DELETE_LECTION', payload: id})
            });
    }
}

export function editLection(id, theme, dateStart, dateFinish, classroom, teacher, schools) {
    return dispatch => {
        store.update('lections2', {_id: id, theme, dateStart, dateFinish, classroom, teacher, schools})
            .then(() => {
                dispatch({type: 'EDIT_LECTION', payload:{id, theme, dateStart, dateFinish, classroom, teacher, schools}})
            });
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

export function loadData(){
    return dispatch => {
        store.getList('lections2')
            .then(res => {
                dispatch({type: 'LOAD_LECTIONS_DATA_SUCCESS', payload: res})
            });
    }
}



