import jwt from "jsonwebtoken";

/*
UTILS SERVEM PARA SEREM FUNÇÕES AUXILIARES,
DEIXANDO O CÓDIGO PRINCIPAL LIMPO
*/

/*PRA GERAR UM SECRET EFICIENTE ALEATORIO, EXECUTE A FUNÇÃO NO
TERMINAL: 
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
*/

/* Usando parenteses consigo dar um return implícito */
export const generateAcessToken = (payload) => (
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "30m"})
);

export const generateRefreshToken = (payload) => (
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"})
);