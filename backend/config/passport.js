import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.model.js";

// Determine the environment
const ENV = process.env.NODE_ENV || 'development';

// Set the path to the appropriate .env file within the backend directory
let envFile = './.env.development';
if (ENV === 'production') {
  envFile = './.env.production';
}

// Load environment variables from the specified .env file
dotenv.config({ path: envFile });


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
        });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Serializing user');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Deserializing user');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL, // Use environment variable
}, async (accessToken, refreshToken, profile, done) => {
  console.log('Profile: ', profile);
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    // Extract first and last name from displayName
    const [firstName, lastName] = profile.displayName.split(' ');
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

    const newUser = await User.create({
      googleId: profile.id,
      firstName,
      lastName,
      email,
      profilePicture,
      // Add other necessary fields
    });

    return done(null, newUser);
  } catch (err) {
    return done(err, null);
  }
}));