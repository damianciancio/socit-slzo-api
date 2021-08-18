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
    console.log(req.params.id);

    if (isNaN(req.params.id)) {
        return res.status(409).send({message: 'Invalid parameter'});
    }

    const user = await db.models.User.findOne({
        include: 'role',
        where: {
            user_id: req.params.id
        }
    });

    if (user === null) {
        return res.status(404).send({message: 'Usuario no encontrado'})
    }

    console.log(user);
    res.send(user);
});

router.post('/', function(req, res){

    const user = db.models.User.build(req.body);

    user.setPassword(req.body.password);
    user.save();

    req.login(user, function(err) {
        if (err) {
            console.log(err);
        }
        var token = user.generateJwt();
        res.send({
            user: user,
            token: token   
        });    
    })
});

router.put('/', async function(req, res) {
    const user_id = req.body.user_id;
    if (!user_id) {
        return res.status(409).send('You must provide user_id');
    }

    const user = await db.models.User.findByPk(user_id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    for(let property in req.body) {
        user[property] = req.body[property];
    }

    await user.save();
    return res.send(user);
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