export function addClassroom(title, capacity, description) {
    let newClassroom = {
        id: Date.now(),
        title: title,
        capacity: capacity,
        description: description
    };
    return {
        type: 'ADD_CLASSROOM',
        payload: newClassroom
    }
}

export function deleteClassroom(id) {
    return {
        type: 'DELETE_CLASSROOM',
        payload: id
    }
}


export function editClassroom(id, title, capacity, description) {
    return {
        type: 'EDIT_CLASSROOM',
        payload: {id, title, capacity, description}
    }
}

