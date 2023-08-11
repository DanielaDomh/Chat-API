const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        const errors = error.errors.length;
        next({
            status: 400,
            errorName: "Invalid or missing data",
            error:{ errorQty: errors, errors: error.errors.map((e) => e.msg)}
        })
    }
}

module.exports = validateResult;