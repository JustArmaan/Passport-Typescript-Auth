import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { session } from "passport";

router.get("/", (req, res) => {
  res.send("welcome");
});

interface SessionInfo {
  sessionID: string;
  userID: string;
}

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log("User object:", req.user);
  const userRole = req.user?.role || "user";
  
  if (userRole === "admin") {
    // @ts-ignore
    req.sessionStore.all((err: any, sessions: any) => {
      if (err) {
        throw err;
      }
      const session:SessionInfo[] = [];
      const sessionInfo = Object.keys(sessions);
      console.log(sessionInfo)
      sessionInfo.forEach((sessionID) => {
        const sessionData = sessions[sessionID];
        const userObject = {
          sessionID: sessionID,
          userID: sessionData.passport.user,
        };
        session.push(userObject);
      });
      console.log(session);
      res.render("adminDashboard", { user: req.user, session: session });
    });
  } else {
    res.render("dashboard", { user: req.user });
  }
});
  // console.log("Role:", req.user?.role)
  // res.render("dashboard", {
  //   user: req.user,
  // });

export default router;
