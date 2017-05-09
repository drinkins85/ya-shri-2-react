export function addError(errors) {
    return {
        type: 'ADD_ERROR',
        payload: errors
    }
}

export function deleteErrors() {
    return {
        type: 'DELETE_ERRORS'
    }
}

