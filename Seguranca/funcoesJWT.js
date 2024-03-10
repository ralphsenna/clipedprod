import jwt from "jsonwebtoken";

export function assinar(usuario){
    const token = jwt.sign({usuario}, process.env.SEGREDO, {expiresIn: '1h'});
    return token;
}

export function verificarAssinatura(token){
    return jwt.verify(token, process.env.SEGREDO);
}