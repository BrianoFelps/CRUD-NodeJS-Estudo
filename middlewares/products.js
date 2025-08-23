export const productsAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if(auth === 'verificacao token') return next();
    res.status(401).send();
}