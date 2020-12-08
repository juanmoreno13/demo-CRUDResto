const express = require('express')
const app = express();
const sequelize = require('./database/db');
const applicationPort = 3003;
const Food = require('./database/models/Food'); //modelo de los platos
const User = require('./database/models/User'); //modelo de usarios
const Order = require('./database/models/Order'); // modelo de Orden
const OrderDetail = require('./database/models/OrderDetail'); //modelo de Detalle de Orden
const Rol = require('./database/models/Rol'); //modelo de Detalle de Rol

//Utilizamos Body Parser para usar JSON Body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
app.get('/probandogit');

// JWT para Autenticar 

const jwt = require('jsonwebtoken');
require('dotenv').config();

// require('./database/relaciones);
// app.use('/users', require('./routes/users'));

// Rutas de Pedido
app.post('/pedido', async (req, res) => {
    const total = req.body.items.reduce((prev, item) => prev + (item.precio * item.cantidad), 0);
    const created = await Order.create({
        id_usuario: req.body.id_usuario,
        forma_de_pago: req.body.forma_de_pago,
        total: total,
    });

    req.body.items.forEach(async (item) => {
        await OrderDetail.create({
            id_pedido: created.id,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio,
            precio_total: item.precio * item.cantidad
        });
    });

    res.json({ ...created.dataValues, items: req.body.items });
});

// ver todos los pedidos 

app.get('/pedidos', async function (req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Pedidos',
        pedido: await Order.findAll({
            include: [
                { model: OrderDetail, include: [{ model: Food, as: 'producto', sourceKey: 'id_producto' }] },
                // { model: User, as: 'usuario', sourceKey: 'id_usuario'}
            ],
        }),
    };
    res.send(respuesta);
});

// actualizar pedido, solo el estado

app.put('/pedidos/:id', autenticarToken, (req, res) => {
    if (req.user.nombre_rol !== 'ADMIN') {
        return res.sendStatus(401);
    }
    Order.update({
        estado: req.body.estado
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
});

// buscar un pedido por ID 

app.get('/pedidos/:id', (req, res) => {
    Order.findByPk(req.params.id).then(order => {
        res.json(order);
    })
});

// Rutas de Usuario

app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        res.json(user);
    })
});

//Registro de usuario 

app.post('/users', async (req, res) => {
    const userRol = await Rol.findOne({ where: { nombre: 'USER' } });
    User.create({
        nombrecompleto: req.body.nombrecompleto,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        id_rol: userRol.id,
    }).then(user => {
        res.json(user);
    })
});

//Login

app.post('/login', async (req, res,) => {

    let correo = req.body.correo;
    let clave = req.body.clave;

    const user = await User.findOne({ where: { correo: correo } });


    if (user.contrasena === clave) {
        const userRol = await Rol.findOne({ where: { id: user.id_rol } });

        const response = {
            id: user.id,
            correo: user.correo,
            id_rol: user.id_rol,
            nombre_rol: userRol.nombre,
        }

        const token = jwt.sign({ response }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token });

    } else {

        console.log("clave incorrecta")
    }
});

// autenticacion de usuario usando middleware 

function autenticarToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)
        req.user = { ...user.response };
        next()
    })
};

app.post('/seguro', autenticarToken, (req, res) => {
    res.send(`esta es una pagina autenticada" Hola ${req.user.user.nombrecompleto}`)
});

// pedidos para un solo usuario 

app.get('/pedidos', autenticarToken, (req, res) => {
    const pedidosTodos = Order.findAll(
        {
            where:
                { id_usuario: "0" }
        })
    res.json(pedidosTodos)
});

//Rutas Platos

app.get('/platos/:id', (req, res) => {
    Food.findByPk(req.params.id).then(food => {
        res.json(food);
    })
});

app.get('/platos', async (req, res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Nuestros Platos',
        respuesta: await Food.findAll({})
    };
    res.send(respuesta);
});

app.post('/platos', (req, res) => {
    Food.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.body.imagen,
    }).then(food => {
        res.json(food);
    })
});

app.put('/platos/:id', (req, res) => {
    Food.update({
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.body.imagen
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
});

app.delete('/platos/:id', (req, res) => {
    Food.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
});

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
