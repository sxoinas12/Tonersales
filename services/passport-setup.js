const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;

if (process.env.NODE_ENV === 'development') {
    keys = require('./keys');
} else if (process.env.NODE_ENV === 'production') {
    keys = require('./private-keys');
}

const knex = require('../models/database');
//access token is a token that we receive from google
//refresh token refresh access token

passport.serializeUser((user,done) => {
    console.log("do i come here?")
    console.log(user);
    //null can be an error & id is the id of mysql
    done(null,user.id);
});


passport.deserializeUser((id,done) => {
    //null can be an error & id is the id of mysql
    console.log("Or i come here?")
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
        console.log("we did found userrr");
        var user = {
            username : profile.displayName, 
            googleId : profile.id,
            token    : accessToken
        };

        knex.table('Users').where({googleId:user.googleId}).select('*').
        then((data) => {
            if(data.length > 0){
              console.log("found user");
              knex.table('Users').where({googleId:user.googleId}).update({token:accessToken}).then(() => {
                return done(null,data);
              });
            } else {
                console.log("didnt found user");
                knex.table('Users').insert(user)
                .then((user) => {
                    console.log(user);
                    return done(null,user);
                });
            }
       });
}));



passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"
  }, (accessToken,refreshToken,profile,done) => {
        //check if user alread exists in our database
        //missing code
     // console.log(accessToken);
    // let user = {}
    // done(null,user)
    console.log("here????")
    let user = {
        username   : profile.displayName, 
        facebookId : profile.id,
        token       : accessToken
    };
    knex.table('Users').where({facebookId:user.facebookId}).select('*')
    .then((data)=>{
        if(data.length > 0){
            console.log("found user")
            knex.table('Users').where({facebookId:user.facebookId}).update({token:accessToken}).then(() => {
               return done(null,data);
              }); 
        }
        else {
            console.log("didnt found user ..Inserting user..")
            knex.table('Users').insert(user)
            .then((user)=>
                { 
                    console.log("first here")
                    return done(null,user)
                })
        }
    }).catch((e)=>{
        console.log("Error Found:",e)
    })
  }
  ));


