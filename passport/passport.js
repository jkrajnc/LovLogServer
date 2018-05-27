const bCrypt = require('bcrypt');
const clanDAO = require('../dao/clanDAO');

module.exports = function(passport){

    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'uporabnisko_ime',
            passwordField: 'hash_geslo',
            passReqToCallback: true
        },

        async function(req, uporabnisko_ime, hash_geslo, done){
            let generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            const clan = await clanDAO.getClanByUsername(uporabnisko_ime);
            console.log(clan);

            if(clan){
                return done(null, false, {
                    message: 'Uporabnisko ime že zavzeto'
                });
            } else {
                const userPassword = generateHash(hash_geslo);
                req.body.hash_geslo = userPassword;

                const newClan =  await clanDAO.saveClan(req.body);
                if(!newClan){
                    return done(null, false);
                }
                if(newClan){
                    return done(null, newClan);
                }
            }
        }
    ));


    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },

        async function(req, username, password, done){
            try{
                const clan = await clanDAO.getClanByUsername(username);

                if(!clan){
                    return done(null, false, {
                        message:'Uporabnisko ime ne obstaja'
                    })
                }
                const isValid = await passwordIsValid(password, clan.attributes.hash_geslo );
                try{
                    if(!isValid){
                        console.log('Invalid password');
                        return done(null, false);
                    }
                    return done(null, clan);
                } catch (e) {
                    console.error(e);
                }

            } catch(error){
                console.error(error);
            }
        }
    ));

    async function passwordIsValid(password, hashedPassword){
        return await bCrypt.compare(password, hashedPassword);
    }
};
