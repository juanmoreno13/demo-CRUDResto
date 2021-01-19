const { Sequelize } = require('sequelize');

// datos para acceder a la base de datos 

// const sequelize = new Sequelize('resto', 'jerry', 'jerry', {
//     dialect: 'mysql',
//     host: "192.168.64.2",
//     port: 3306,
// });

const sequelize = new Sequelize( {
username: 'nke22KUC6U',
password: 'EHdNMzfjWO',
database: 'nke22KUC6U',
host: 'remotemysql.com',
dialect: 'mysql',
port:'3306'
});

module.exports = sequelize;
