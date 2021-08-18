const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../services/data');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const SECRET_KEY = "clavesecreta";


class User extends Model {
    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }

    validPassword(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        return hash == this.hash;
    }

    generateJwt() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            username: this.username,
            exp: parseInt(expiry.getTime() / 1000)
        }, SECRET_KEY); // TODO: setear esta variable como variable de entorno
    }
}



User.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
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
        type: DataTypes.ENUM('ok', 'owe'),
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    role_id: {
        type: DataTypes.INTEGER
    },
    hash: {
        type: DataTypes.STRING
    },
    salt: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});