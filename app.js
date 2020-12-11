const express = require('express')
const app = express();
const sequelize = require('./database/db');
const applicationPort = 3003;

//Utilizamos Body Parser para usar JSON Body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT para Autenticar 
const jwt = require('jsonwebtoken');
require('dotenv').config();

// llamamos a las Rutas
app.use('/api/users', require('./rutas/users'));
app.use('/api/productos', require('./rutas/productos'));
app.use('/api/pedidos', require('./rutas/pedidos'));
app.use('/api/login', require('./rutas/login'));


//Inicializamos el Servidor
app.listen(applicationPort, () => {
    console.log(`App iniciada en puerto ${applicationPort}`)
});

// Verificar conexion a la db
//force true - borra la tabla. False es default. 

sequelize.sync({ force: false }).then(() => {
    console.log("Conectados a la DB")
}).catch(error => {
    console.log("Se ha producido un error", error);
});
