class NotFoundError extends Error{
    constructor(entity){
        super(`${entity} not found!`);
    }
}

export default NotFoundError;