// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/user.model.js';
// import dotenv from 'dotenv';

// dotenv.config();

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     const existingUser = await User.findOne({ googleId: profile.id });
//     if (existingUser) return done(null, existingUser);

//     const newUser = await User.create({
//       googleId: profile.id,
//       displayName: profile.displayName,
//       email: profile.emails[0].value,
//       profilePicture: profile.photos[0].value,
//     });
//     return done(null, newUser);
//   } catch (error) {
//     return done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    // Extract first and last name from displayName
    const [firstName, lastName] = profile.displayName.split(' ');

    const newUser = await User.create({
      googleId: profile.id,
      firstName: firstName,
      lastName: lastName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0].value,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});