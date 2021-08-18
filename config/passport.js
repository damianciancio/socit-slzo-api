var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const db = require('../services/data');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username'
        }, function(username, password, done){
            db.models.User.findOne({ where: {username: username} }).then(function(user){
                if(!user){
                    return done(null, false, {
                        message: "Usuario no encontrado"
                    });
                }

                if(!user.validPassword(password)){
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    });
                }
                
                return done(null, user);
            })
            .catch(err => {
                done(err);
            });
        }
    )
)