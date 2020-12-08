const {Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Rol extends Model {}
Rol.init({
  // Model attributes are defined here
  nombre: DataTypes.STRING,
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'Roles' // We need to choose the model Table name
});

module.exports = Rol