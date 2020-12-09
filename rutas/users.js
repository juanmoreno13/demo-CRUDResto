const express = require('express');
const router = express.Router();
const Rol = require('../database/models/Rol');  //modelo de Detalle de Rol
const User = require('../database/models/User'); //modelo de usarios


//Creacion de usuario 

router.post('/', async (req, res) => {
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

// Busqueda de un usuario

router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        res.json(user);
    })
});


module.exports = router;
