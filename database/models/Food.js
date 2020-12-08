const {Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Food extends Model {}
Food.init({
  // Model attributes are defined here
  nombre: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  imagen: DataTypes.STRING,
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'Platos'
});

module.exports = Food
