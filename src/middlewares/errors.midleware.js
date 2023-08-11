const {
    ValidationError,
    ConectionError,
    DatabaseError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    InvalidConnectionError,
    InstanceError
} = require('sequelize')

//Middleware para logear errores, sirve para ver en consola el tipo de error
const logError = (err, req, res, next) => {
    console.log(err);
    next(err);
};

//Middleware para gestion de errores de ORM
const handleORMError = (err, req, res, next) => {
    if (err instanceof ConectionError ||
        err instanceof ConnectionRefusedError ||
        err instanceof ConnectionTimedOutError ||
        err instanceof InvalidConnectionError) {
            return res.status(409).json({
                error: "database conection error",
                message: err.error,
           })
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({
            name: err.name,
            message: err.message,
            errors: err.errors
        })
    }
    if (err instanceof DatabaseError) {
        return res.status(409).json({
            name:err.name,
            message: err.message,
            errors: err.errors
        })
    }
    next(err)
}

//Middleware errores generales
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.errorName,
        message: err.error
    })
};

module.exports ={
    logError,
    errorHandler,
    handleORMError
}