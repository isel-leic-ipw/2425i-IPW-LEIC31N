import {ERROR_CODES}  from "./errors.mjs"


function HttpError(status, obj) {
    this.status = status
    this.body = obj
}

const ERROR_MAPPING =  {
    [ERROR_CODES.InvalidData]: 400,
    [ERROR_CODES.NotFound]: 404,

}



export default function(applicationError) {
    return new HttpError(ERROR_MAPPING[applicationError.code], { message: applicationError.message})
}