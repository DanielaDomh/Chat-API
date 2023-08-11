const { Router } =require('express');
const { createUser, loginUser, getAllUsers }= require('../controllers/users.controller');
const { loginUserValidator, registerUserValidator } = require('../validators/user.validator');
const authenticate =require('../middlewares/auth.middleware');

const router = Router();

//Crear usuarios ✅
router.post("/users", registerUserValidator, createUser );

//Logear usuario ✅
router.post("/login", loginUserValidator, loginUser);

//Obtener usuarios (con proteccion de autenticacion)
router.get('/users', 
//authenticate,
getAllUsers)


module.exports =router;
