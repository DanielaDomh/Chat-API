const { logError, errorHandler, handleORMError } =require('../middlewares/errors.midleware');

const errorRoutes = (app) => {
    app.use(logError);
    app.use(errorHandler);
    app.use(handleORMError);
};

module.exports = errorRoutes;
