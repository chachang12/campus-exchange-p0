import express from "express";
import passport from "passport";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config({ path: './.env.production' });

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_BASE_URL + "/login" }),
  async function (req, res) {
    req.session.loggedIn = true;
    req.session.user = req.user; // Set the session user as the newly logged-in user
    await req.session.save(); // Save the session after successful authentication
    res.redirect(process.env.CLIENT_BASE_URL);
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