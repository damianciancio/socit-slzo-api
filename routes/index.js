
var router=require('express').Router();

var passport = require('passport');

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'clavesecreta',
    userProperty: 'payload', 
    algorithms: ['sha1', 'RS256', 'HS256'],
});
router.use('/users', auth, require('./users'));

module.exports = router;