
var router=require('express').Router();

var passport = require('passport');

//var jwt = require('express-jwt');
/*var auth = jwt({
    secret: 'clavesecreta',
    userProperty: 'payload'
});*/

router.use('/users', require('./users'));

module.exports = router;