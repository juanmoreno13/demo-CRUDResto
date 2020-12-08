const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
// const Order = require('./Order');

class User extends Model { }
User.init({
  // Model attributes are defined here
  nombrecompleto: DataTypes.STRING,
  correo: DataTypes.STRING,
  contrasena: DataTypes.STRING,
  telefono: DataTypes.INTEGER,
  direccion: DataTypes.STRING,
  id_rol: DataTypes.INTEGER,
},
  {
    sequelize, // We need to pass the connection instance
    modelName: 'Usuarios' // We need to choose the model Table name
  });

// User.hasMany(Order, { foreignKey: 'id_usuario' });
// // Order.belongsTo(User);

module.exports = User;
