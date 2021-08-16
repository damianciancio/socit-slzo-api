
var mongoose = require('mongoose');
var router = require('express').Router();
const sequelize = require('../services/data');


router.post('/', (req, res, next) => {
    var name=req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    if (username.trim() == "" || password.trim() == "" || name.trim() == "") {
        return res.status(403).send({code: 'missing_username_or_password', message: 'You must provide username and password'});
    }
    
    sequelize.models.User.findOne({where: {username: username}}).then(playerFound => {
        if (playerFound) {
            return res.status(401).send({code: 'username_already_taken', message: 'Username already taken'});
        } else {   
            let player = new Player();
            player.name=req.body.name;
            player.username = req.body.username;
            player.password = req.body.password;
            
            player.setPassword(password);    
            player.save();

        }
    });
});


module.exports = router;