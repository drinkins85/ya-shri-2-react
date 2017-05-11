import store from '../store/mlab-api';

export function addTeacher(firstName, lastName, company, description) {
    return dispatch => {
        let newTeacher = {
            _id: Date.now(),
            firstName: firstName,
            lastName: lastName,
            company: company,
            description: description
        };
        store.put('teachers2', JSON.stringify(newTeacher))
            .then(() => {
                dispatch({type: 'ADD_TEACHER', payload: newTeacher})
            });
    }
}

export function deleteTeacher(id) {
    return dispatch => {
        store.delete('teachers2', id)
            .then(() => {
                dispatch({type: 'DELETE_TEACHER', payload: id})
            });
    }
}

export function editTeacher(id, firstName, lastName, company, description) {
    return dispatch => {
        store.update('teachers2', {_id: id, firstName, lastName, company, description})
            .then(() => {
                dispatch({type: 'EDIT_TEACHER', payload:{id, firstName, lastName, company, description}})
            });
    }
}

export function loadData(){
    return dispatch => {
        store.getList('teachers2')
            .then(res => {
                dispatch({type: 'LOAD_TEACHERS_DATA_SUCCESS', payload: res})
            });
    }
}



