import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}
const router = express.Router();


router.get('/login', (req, res) => {
// have an if statement that checks if it isnt a null or undefined
if (req.session.messages != null && req.session.messages.length > 0) {
  res.render('login', { messages: req.session.messages });
  req.session.messages = [];
} else {
  res.render('login', { messages: [] });
}
});



router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
