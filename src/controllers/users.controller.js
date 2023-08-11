const { Users } =require('../models');
const bycript = require('bcrypt');
const jwt =require('jsonwebtoken');
require('dotenv').config();

//Crear usuarios
const createUser = async (req, res, next) => {
try {
    const {email, password, username} = req.body;

    const hashed = await bycript.hash(password, 10);

    await Users.create({username, email, password: hashed});
    res.json(200).end();
  } catch(error) {
    next(error);
  }
}

//Obtener usuarios
const getAllUsers = async (req, res) => {
  try {
      const user = await Users.findAll({
         attributes: { exclude: [
          "password"
         ]},
      })
      res.json(user);
  } catch {
      res.status(400).json(error);

  }
}

//Controlador Login
const loginUser = async (req, res, next) => {
try {
  const {email, password} = req.body;

  //Buscar un usuario ingresado en el body, si existe devuelve un objeto si no devuelve un null
  const user = await Users.findOne({where: {email}})
  if(!user){
    return next({
      status:400,
      errorName: "Invalid credentials",
      error:"incorrect email or password",
    });
  }

  const validPassword = await bycript.compare( password, user.password )
  if(!validPassword){
    return res.status(400).json({
      message: 'The email or password is not found'
    })
  }
  
  //Generar Token
  const {
    id,
    username,
    firstname,
    lastname,
    profileImage,
    vslidEmail,
    createdAt,
    updatedAt } = user;

  const token = jwt.sign(
     // Payload
   { id, username, email, firstname, lastname },
     //Palabra Secreta
    process.env.JWT_SECRET,
   { algorithm: 'HS512', expiresIn: '2h'}
   );

  res.json({
    id,
    username,
    email,
    firstname,
    lastname,
    profileImage,
    vslidEmail,
    createdAt,
    updatedAt,
    token
  });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers
};

//importamos
//Tener contrase;a en texto plano
//decidir un saltRounds
//hashear contrasena
