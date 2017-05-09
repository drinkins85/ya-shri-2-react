export function addTeacher(firstName, lastName, company, description) {
    let newTeacher = {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        company: company,
        description: description
    };
    return {
        type: 'ADD_TEACHER',
        payload: newTeacher
    }
}

export function deleteTeacher(id) {
    return {
        type: 'DELETE_TEACHER',
        payload: id
    }
}


export function editTeacher(id, firstName, lastName, company, description) {
    return {
        type: 'EDIT_TEACHER',
        payload: {id, firstName, lastName, company, description}
    }
}

