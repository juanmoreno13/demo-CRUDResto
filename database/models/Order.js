const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const OrderDetail = require('./OrderDetail');
const User = require('./User');

class Order extends Model { }
Order.init({
  // Model attributes are defined here
  id_usuario: DataTypes.INTEGER,
  total: DataTypes.DECIMAL,
  forma_de_pago: DataTypes.STRING,
  estado: DataTypes.STRING
},
  {
    sequelize, // We need to pass the connection instance
    modelName: 'Pedidos' // We need to choose the model Table name
  });


Order.hasMany(OrderDetail, { foreignKey: 'id_pedido' });
Order.hasOne(User, { foreignKey: 'id', sourceKey:'id_usuario', as: 'usuario' });

module.exports = Order;