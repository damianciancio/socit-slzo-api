const express = require('express');
const sequelize = require('./services/data');
const app = express()
const port = 3000;

require('./models');

app.use('/api', require('./routes'));


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  sequelize.sync({force: true}).then(async () => {
    const role = await sequelize.models.Role.create({role_name: 'admin'});
    sequelize.models.User.create({
      email: 'damianciancio7@gmail.com',
      name: 'Damián',
      lastname: 'Ciancio',
      financial_status: 'ok',
      active: true,
      dni: '37830521',
      role_id: role.dataValues.role_id,
      includes: [sequelize.models.User.Role]})
  })
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})