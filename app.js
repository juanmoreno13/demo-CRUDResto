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


//Documentacion
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// llamamos a las Rutas 
app.use('/api/users', require('./rutas/users'));
app.use('/api/productos', require('./rutas/productos'));
app.use('/api/pedidos', require('./rutas/pedidos'));
app.use('/api/login', require('./rutas/login'));

//Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Deliah Resto API',
            version: '1.0.0',
            url: 'localhost:3003/api-docs'
        }
    },
    apis: ['app.js', 'productos.js', 'pedidos.js', 'users.js', 'login.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);

//URL para ver la documentación
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Documentación de la API en Swagger 
//localhost:3003/api-docs/

/**
 * @swagger
 *  /api/productos:
 *    get: 
 *      description: Get de todos los productos
 *      responses:
 *         200:
 *          description: Nuestros Platos
 *    post:
 *      description: Crear un nuevo plato SOLO ADMIN con Token Validado
 *      security: 
 *          - OAuth2: [admin]
 *      parameters:
 *      - name: nombre
 *        description: nombre del plato
 *        in: req.body.nombre
 *        type: string
 *      - name: precio  
 *        description: precio del plato
 *        in: req.body.precio
 *        type: integer
 *      - name: imagen  
 *        description: imagen del plato
 *        in: req.body.imagen
 *        type: string
 *      responses:
 *          403:
 *           description: Forbiden 
 *          200: 
 *           description: Plato Creado
 *    put:
 *      description: Actualizar SOLO ADMIN con Token Validado
 *      security: 
 *          - OAuth2: [admin]
 *      parameters:
 *      - name: id
 *        description: id del plato a borrar
 *        in: req.params.id
 *        type: integer   
 *      - name: nombre
 *        description: nombre del plato
 *        in: req.body.nombre
 *        type: string
 *      - name: precio  
 *        description: precio del plato
 *        in: req.body.precio
 *        type: integer
 *      - name: imagen  
 *        description: imagen del plato
 *        in: req.body.imagen
 *        type: string
 *      responses:
 *          403:
 *           description: Forbiden 
 *          200: 
 *           description: Plato Actualizado
 *    delete:
 *      description: Borrar platos solo Admin con token validado
 *      security:
 *          -OAuth: [admin]
 *      parameters:
 *      - name: id
 *        description: id del plato a borrar
 *        in: req.params.id
 *        type: integer
 *      responses:
 *          403:
 *           description: Forbiden 
 *          200: 
 *           description: Plato Borrado
 */

/**
 * @swagger
 *  /api/pedidos:
 *    get: 
 *      description: Get de todos los Pedidos
 *      security:
 *          -OAuth: [admin]
 *      parameters:
 *      - name: ID del usuario
 *        in: header
 *        type: integer 
 *      responses:
 *          200:
 *           description: Estos son tus Pedidos
 *    put: 
 *      description: Actualizar el estado del pedido
 *      security:
 *          -OAuth: [admin]
 *      parameters:
 *      - name: id
 *        description: id del pedido a actualizar 
 *        in: req.params.id
 *        type: integer
 *      - name: estado
 *        description: estado actual del pedido
 *        in: req.body.estado
 *        type: string 
 *      responses:
 *          200:
 *           description: Estado de pedido actualizado
 *    post:
 *      description: Crear un nuevo Pedido
 *      parameters:
 *      - name: id_usuario
 *        description: ID del usuario
 *        in: req.body.id_usuario
 *        type: integer
 *      - name: forma de pago  
 *        description: forma de pago
 *        in: req.body.forma_de_pago
 *        type: string
 *      responses:
 *          200: 
 *           description: Pedido creado     
 */

 /**
 * @swagger
 *  /api/users:
 *    post:
 *      description: Creacion de usuario
 *      parameters:
 *      - name: nombrecompleto
 *        in: req.body.nombrecompleto
 *        type: string
 *      - name: correo
 *        in: req.body.correo
 *        type: string
 *      - name: constrasena
 *        in: req.body.constrasena
 *        type: string
 *      - name: telefono
 *        in: req.body.telefono
 *        type: integer
 *      - name: direccion
 *        in: req.body.direccion
 *        type: string
 *      responses:
 *          200:
 *           description: Usuario Creado      
 */

  /**
 * @swagger
 *  /api/login:
 *    post:
 *      description: Login
 *      parameters:
 *      - name: correo
 *        in: req.body.correo
 *        type: string
 *      - name: clave
 *        in: req.body.clave
 *        type: string
 *      responses:
 *          200:
 *           description: Usuario Validado
 *           content: 
 *              text/plain:
 *                  schema:
 *                      example: JWT
 *          400:
 *           description: Usuario o clave incorrecto     
 */

 
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
