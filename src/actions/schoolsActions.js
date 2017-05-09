export function addSchool(title, amount) {
    let newSchool = {
        id: Date.now(),
        title: title,
        amount: amount
    };
    return {
        type: 'ADD_SCHOOL',
        payload: newSchool
    }
}

export function deleteSchool(id) {
    return {
        type: 'DELETE_SCHOOL',
        payload: id
    }
}


export function editSchool(id, title, amount) {
    return {
        type: 'EDIT_SCHOOL',
        payload: {id, title, amount}
    }
}

