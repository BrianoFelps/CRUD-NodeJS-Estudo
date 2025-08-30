class ErrorNotFound extends Error{
    constructor(entity){
        super(`${entity} not found!`);
    }
}

export default ErrorNotFound;