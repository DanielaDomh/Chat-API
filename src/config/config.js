//Para usar variables de entorno hay que convertir el config.json en config.js, arreglamos los errores de la consola cambiando nombres en 
//.sequelizerc y en index (dentro de la carpeta de models)

require('dotenv').config()

module.exports = {
  "development": {
    "username": "postgres",
    "password": "daniela05",
    "database": "chat_db",
    "port": 5432,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    "dialectOptions": {ssl: { required: true, rejectUnauthorized: false }}
 
  }
}
