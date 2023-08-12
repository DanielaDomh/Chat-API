const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const apiRoutes = require('./routes');
const errorRoutes = require('./routes/error.routes')
require('dotenv').config();


const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", express.static("public"));

apiRoutes(app);

//Ruta de prueba
// app.get('/', (req,res) => {
// res.send('Servidor funcionando');
// });

//Middleware de error
errorRoutes(app);

app.listen(PORT, () => {
console.log(`servidor escuchando en el puerto ${PORT}`)
});