const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    try{
    //Recuperar Token
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
           return next({
            status: 401,
            errorName: "No token",
            error: "No token present in headers",
           });
        }

    // Verificar un token
    //  Si el token es valido nos decodifica la informacion y devuelve el objeto con la info del usuario
    //  Si no es valido lanza una excepcion que hay que manejar con un catch

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: "HS512"
        });
        req.user = decoded;
        next(); 
    } catch(error) {
        next({
            status:498,
            errorName: 'Invalid Token',
            error
        })
    }
}

module.exports = authenticate;