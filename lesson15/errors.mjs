function ApplicationError(code, message) {
    this.code = code
    this.message = message
}

export const ERROR_CODES = {
    InvalidData: 1,
    NotFound: 2,
}


export default {
    INVALID_DATA: message => new ApplicationError(ERROR_CODES.InvalidData, message),
    NOT_FOUND: message => new ApplicationError(ERROR_CODES.NotFound, message)
}