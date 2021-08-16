const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/data');

class User extends Model { }

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    financial_status: {
        type: DataTypes.ENUM('ok','owe'),
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    role_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});