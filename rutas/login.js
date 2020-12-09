const express = require('express');
const router = express.Router();
const Rol = require('../database/models/Rol');  //modelo de Detalle de Rol
const User = require('../database/models/User'); //modelo de usarios
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Login

router.post('/login', async (req, res,) => {

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


module.exports = router
