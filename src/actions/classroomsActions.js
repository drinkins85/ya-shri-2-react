import store from '../store/mlab-api';

export function addClassroom(title, capacity, description) {
    return dispatch => {
        let newClassroom = {
            _id: Date.now(),
            title: title,
            capacity: capacity,
            description: description
        };
        store.put('classrooms2', JSON.stringify(newClassroom))
            .then(() => {
                dispatch({type: 'ADD_CLASSROOM', payload: newClassroom})
            });
    }
}

export function deleteClassroom(id) {
    return dispatch => {
        store.delete('classrooms2', id)
            .then(() => {
                dispatch({type: 'DELETE_CLASSROOM', payload: id})
            });
    }
}

export function editClassroom(id, title, capacity, description) {
    return dispatch => {
          store.update('classrooms2', {_id: id, title, capacity, description})
            .then(() => {
                dispatch({type: 'EDIT_CLASSROOM', payload:{id, title, capacity, description}})
            });
    }
}

export function loadData(){
    return dispatch => {
        store.getList('classrooms2')
            .then(res => {
                dispatch({type: 'LOAD_CLASSROOMS_DATA_SUCCESS', payload: res})
            });
    }
}


