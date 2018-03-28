const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const knex = require('../models/database');
//access token is a token that we receive from google
//refresh token refresh access token

passport.serializeUser((user,done) => {
    //null can be an error & id is the id of mysql
    done(null,user.id);
});


passport.deserializeUser((id,done) => {
    //null can be an error & id is the id of mysql
    knex.table('Users').where({id:id}).select('*')
    .then((user)=>{
        done(null,user);
    });

  
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        //check if user alread exists in our database
      
        var user = {
            username : profile.displayName, 
            googleId : profile.id

        }
        var id = profile.id
       
        knex.table('Users').where({googleId:id}).select('*').
        then((data) => {
            if(data.length > 0){

              // throw Error('User already exists');
              console.log(accessToken);
              console.log(id);
              knex.table('Users').where({googleId:id}).update({token:accessToken}).then(() => {
                return done(null,data)
              });
            }
            else {
                
                knex.table('Users').insert(user)
                .then((user) => {
                    return done(null,user);
                });
       }
    })
}));

