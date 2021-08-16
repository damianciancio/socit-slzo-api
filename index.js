const express = require('express');
const sequelize = require('./services/data');
const app = express()
var passport = require('passport');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var originsWitheList = [
  "*",
  "http://localhost:8080",
  "http://localhost:4200",
  "http://localhost:1024"
]
var listEndpoints = require('express-list-endpoints');

var corsOptions = {
  origin:
    function (origin, callback) {
      if (typeof origin != 'undefined') {
        console.log(origin);
      }
      var isWitheListed = originsWitheList.indexOf(origin) !== -1;
      console.log(isWitheListed)
      callback(null, isWitheListed);
    },
  credentials: true
}
app.use(cors(corsOptions));


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

require('./models');

require('./config/passport');
app.get("/endpoints", function (req, res, next) {
  res.send(listEndpoints(app));
})
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  sequelize.sync({ force: true }).then(async () => {
    const role = await sequelize.models.Role.create({ role_name: 'admin' });
    const user = await sequelize.models.User.create({
      email: 'damianciancio7@gmail.com',
      name: 'Damián',
      lastname: 'Ciancio',
      financial_status: 'ok',
      active: true,
      dni: '37830521',
      role_id: role.dataValues.role_id,
      includes: [sequelize.models.User.Role]
    })
    user.setPassword('admin');
    user.save();
  });

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