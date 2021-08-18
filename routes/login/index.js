
var router = require('express').Router();
var passport = require('passport');
const sequelize = require('../../services/data');


router.post("/", function (req, res, next) {
    sequelize.models.User.findOne({ where: { username: req.body.username } })
        .then(function (user) {
            passport.authenticate('local', function (err, user, info) {
                var token;
                console.log("hola");
                console.log(JSON.stringify(user));
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                // If a user is found
                if (user) {
                    token = user.generateJwt();
                    res.status(200);
                    res.json({
                        user: user,
                        token: token
                    });
                } else {
                    // If user is not found
                    res.status(401).json(info);
                }
            })(req, res);
        });
});


module.exports = router;