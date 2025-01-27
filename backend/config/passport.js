import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      if (!email) {
        throw new Error('Email is required');
      }
      const user = await User.findOrCreate(profile, email);
      return cb(null, user);
    } catch (err) {
      console.error('Error in Google OAuth strategy:', err);
      return cb(err, null);
    }
  }
));

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: process.env.MICROSOFT_CALLBACK_URL,
    scope: ['user.read'],
    responseType: 'code', // Set response type to 'code'
    passReqToCallback: true,
    pkce: true, // Enable PKCE
    state: true, // Required when PKCE is enabled
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    try {
      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      if (!email) {
        throw new Error('Email is required');
      }
      const user = await User.findOrCreate(profile, email);
      return cb(null, user);
    } catch (err) {
      console.error('Error in Microsoft OAuth strategy:', err);
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