const express = require('express');
const router = express.Router();
const Food = require('../database/models/Food'); //modelo de los Productos
const verificaJWT = require('../middlewares');

//Rutas Productos 

// Get por producto por Id 

router.get('/:id', (req, res) => {
    Food.findByPk(req.params.id).then(food => {
        res.json(food);
    })
});

//Get de todos los productos 

router.get('/', async (req, res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Nuestros Platos',
        respuesta: await Food.findAll({})
    };
    res.send(respuesta);
});

// Crear un nuevo producto solo Admin

router.post('/', verificaJWT, (req, res) => {
    if (req.user.nombre_rol !=='ADMIN'){
        return res.sendStatus(401);
    }
    Food.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.body.imagen,
    }).then(food => {
        res.json(food);
    })
});

// Actualizar un producto solo Admin

router.put('/:id', verificaJWT, (req, res) => {
    if (req.user.nombre_rol !=='ADMIN'){
        return res.sendStatus(401);
    }
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

//Borrar un producto solo Admin

router.delete('/:id', verificaJWT, (req, res) => {
    if (req.user.nombre_rol !=='ADMIN'){
        return res.sendStatus(401);
    }
    Food.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    })
});

module.exports = router