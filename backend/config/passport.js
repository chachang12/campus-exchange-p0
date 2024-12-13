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