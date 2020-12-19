const express = require('express');
const router = express.Router();
const Food = require('../database/models/Food'); //modelo de los Productos
const Order = require('../database/models/Order'); //modelo de Orden
const OrderDetail = require('../database/models/OrderDetail'); //modelo de Detalle de Orden 
const User = require('../database/models/User');
const verificaJWT = require('../middlewares');

// Rutas de Pedido

// creacion de un pedido

router.post('/', async (req, res) => {
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
            precio_unitario: item.precio, // el precio no deberia de tomarse de la tabla de Platos?
            precio_total: item.precio * item.cantidad
        });
    });

    res.json({ ...created.dataValues, items: req.body.items });
});

// Get de Pedidos Admin o User

router.get('/', verificaJWT, async function (req, res) {
    let where_clause = null;
    if (req.user.nombre_rol !== 'ADMIN') {
        where_clause = { id_usuario: req.user.id };
    }
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Esto son todos tus Pedidos',
        pedido: await Order.findAll({
            where: where_clause,
            include: [
                { model: User, as: 'usuario', attributes: ['id', 'nombrecompleto', 'direccion', 'correo', 'telefono'] },
                { model: OrderDetail, attributes: ['id', 'cantidad', 'precio_unitario', 'precio_total'], include: [{ model: Food, as: 'producto', attributes: ['id', 'nombre'] }] },
            ],
        }),
    };
    res.send(respuesta);
});

// Actualizar el estado del pedido, solo Admin 
router.put('/:id', verificaJWT, (req, res) => {
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


module.exports = router