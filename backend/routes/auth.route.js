import express from "express";
import passport from "passport";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

// Determine the environment
const ENV = process.env.NODE_ENV || 'development';

// Set the path to the appropriate .env file within the backend directory
let envFile = './.env.development';
if (ENV === 'production') {
  envFile = './.env.production';
}

// Load environment variables from the specified .env file
dotenv.config({ path: envFile });

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_BASE_URL_FTB + "/login" }),
  async function (req, res) {
    req.session.loggedIn = true;
    req.session.user = req.user;
    await req.session.save();
    res.redirect(process.env.CLIENT_BASE_URL_FTBH);
  }
);

router.get("/microsoft", passport.authenticate("microsoft", { scope: ["user.read"] }));

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: process.env.CLIENT_BASE_URL_FTB + "/login" }),
  async function (req, res) {
    req.session.loggedIn = true;
    req.session.user = req.user;
    await req.session.save();
    res.redirect(process.env.CLIENT_BASE_URL_FTBH);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;