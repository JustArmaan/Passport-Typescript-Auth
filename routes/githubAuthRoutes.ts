import express from "express";
import passport from "passport";
import passportGitHubStrategy from '../middleware/passportStrategies/githubStrategy';


const router = express.Router();

router.get(
  "/callback",
  passport.authenticate('github', { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

router.post(
  "/login",
  passport.authenticate('github', {
    scope: ["user:email"],
  })

);

export default router;
