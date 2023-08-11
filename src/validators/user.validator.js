const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

//Validators Array
const loginUserValidator = [
    //Verificar cada propiedad del req
    check('email', 'error con el email')
    .exists()
    .isEmail()
    .isString()
    .notEmpty(),
    check('password', 'error con la contraseña')
    .exists()
    .isString()
    .notEmpty(),
    validateResult
];

const registerUserValidator= [
    check('username', 'error con username')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 30 }),
    check('email', 'error con el email')
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 6, max:50 })
    .withMessage('El correo debe de tener de 6 a 50 caracteres'),
    check('password', 'error con la contraseña')
    .exists()
    .notEmpty()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-_^&*])[A-Za-z\d!@#$%-_^&*]{8,}$/)
    .withMessage('La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número, y un caracter especial'),
    validateResult
];

module.exports = {
    loginUserValidator,
    registerUserValidator
}