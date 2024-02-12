import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log("User object:", req.user);
  const userRole = req.user?.role || "user";
  
  if (userRole === "admin") {
    // @ts-ignore
    req.sessionStore.all((err: any, sessions: any) => {
      if(err){
        throw err;
      } 
      const sessionInfo = Object.keys(sessions);
      console.log(sessionInfo)
      sessions.map(() => {

      })
    });
    res.render("adminDashboard", { user: req.user });
  } else {
    res.render("dashboard", { user: req.user });
  }
  // console.log("Role:", req.user?.role)
  // res.render("dashboard", {
  //   user: req.user,
  // });
});

export default router;
