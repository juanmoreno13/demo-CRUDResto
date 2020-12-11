const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Food = require('./Food');

class OrderDetail extends Model { }
OrderDetail.init({
  // Model attributes are defined here
  id_pedido: DataTypes.INTEGER,
  id_producto: DataTypes.INTEGER,
  cantidad: DataTypes.INTEGER,
  precio_unitario: DataTypes.DECIMAL,
  precio_total: DataTypes.DECIMAL,
},
  {
    sequelize, // We need to pass the connection instance
    modelName: 'detallePedidos' // We need to choose the model Table name
  });


OrderDetail.hasOne(Food, { foreignKey: 'id', sourceKey:'id_producto', as: 'producto' });

module.exports = OrderDetail;