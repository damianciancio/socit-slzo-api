const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('socit', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306'
});

module.exports = sequelize;