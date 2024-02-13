import express from "express";

type SessionId = any;

const router = express.Router();

router.post('/revokeSessions/:sessionID', (req, res) => {
    const sessionID: SessionId = req.params.sessionID;
    console.log(sessionID);
    console.log("IT IS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    req.sessionStore.destroy(sessionID, (err) => {
        if (err) {
            console.error("Error:", err);
        }
    })    
});



export default router;