const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/data');

class Role extends Model { }

Role.init({
    // Model attributes are defined here
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
});