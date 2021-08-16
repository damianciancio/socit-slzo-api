require('./roles.js');
require('./users.js');

const sequelize = require('../services/data');

sequelize.models.User.belongsTo(sequelize.models.Role, {foreignKey: 'role_id', as: 'role'});
sequelize.models.Role.hasMany(sequelize.models.User,{foreignKey: 'role_id'});