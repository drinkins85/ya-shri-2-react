import store from '../store/mlab-api';

export function addSchool(title, amount) {
    return dispatch => {
        let newSchool = {
            _id: Date.now(),
            title: title,
            amount: amount
        };
        store.put('schools2', JSON.stringify(newSchool))
            .then(() => {
                dispatch({type: 'ADD_SCHOOL', payload: newSchool})
            });
    }
}

export function deleteSchool(id) {
    return dispatch => {
        store.delete('schools2', id)
            .then(() => {
                dispatch({type: 'DELETE_SCHOOL', payload: id})
            });
    }
}

export function editSchool(id, title, amount) {
    return dispatch => {
        store.update('schools2', {_id: id, title, amount})
            .then(() => {
                dispatch({type: 'EDIT_SCHOOL', payload:{id, title, amount}})
            });
    }
}

export function loadData(){
    return dispatch => {
        store.getList('schools2')
            .then(res => {
                dispatch({type: 'LOAD_SCHOOLS_DATA_SUCCESS', payload: res})
            });
    }
}


