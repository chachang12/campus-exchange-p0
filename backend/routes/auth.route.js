import express from "express";
import passport from "passport";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config({ path: './.env.production' });

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_BASE_URL + "/login" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    if (req.session && req.session.passport) {
      console.log("User not authenticated");
    }
    res.status(401).json({ authenticated: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;