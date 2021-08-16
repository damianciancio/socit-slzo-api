var router = require('express').Router();
var passport = require('passport');
const db = require('../../services/data');

router.get('/', async (req, res) => {
    const users = await db.models.User.findAll({
        include: 'role'
    });
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const users = await db.models.User.findAll({
        include: 'role'
    });
    res.send(users);
});

router.post('/', function(req, res){

    const user = db.models.User(req.body.user);

    user.setPassword(req.body.password);

    user.save();
    req.login(player, function(err) {
        if (err) {
            console.log(err);
        }
        var token = player.generateJwt();
        res.send({
            user: player,
            token: token   
        });    
    })
});
/*  
router.post('/login', function(req, res, next){
    User.findOne({username: req.body.username})
    .then(function(user){
        console.log(user);
        passport.authenticate('local', function(err, user, info){
            var token;
            console.log(err);
            if (err) {
                res.status(404).json(err);
                return;
            }
            
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });
}); 
*/

module.exports = router;