var LinkedinStrategy = require('passport-linkedin').Strategy;
var User = require('../models/User');
var lkConfig = require('../linkd.js');

module.exports = function(passport) {

    passport.use('linkedin', new LinkedinStrategy({
        consumerKey        : lkConfig.appID,
        consumerSecret    : lkConfig.appSecret,
        callbackURL     : lkConfig.callbackUrl,
        profileFields	: ['emails', 'first_name', 'last_name']
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {
		
    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their id from the auth source
	        User.findOne({ 'id' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();

					// set all of the facebook information in our user model
	                newUser.id = profile.id; // set the users facebook id	                
	                newUser.access_token = access_token; // we will save the token that facebook provides to the user	                
	                newUser.firstName  = profile.name.givenName;
	                newUser.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

					// save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;

	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};