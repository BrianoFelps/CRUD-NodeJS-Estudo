class InvalidRefreshToken extends Error{
    constructor(){
        super(`Invalid token!`);
    }
}

export default InvalidRefreshToken;