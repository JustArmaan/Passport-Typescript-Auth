import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import passport from "passport";
import {
    getUserByEmailIdAndPassword,
    getUserById,
  } from "../../controllers/userController";
import dotenv from 'dotenv'; 
dotenv.config();

if (typeof process.env.GITHUB_CLIENT_ID  !== "string" ) {
    throw Error("Github Client ID is not valid")
} 
if (typeof process.env.GITHUB_CLIENT_SECRET  !== "string" ) {
    throw Error("Github Client Secret is not valid")
}
import { userModel } from '../../models/userModel'
const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME Done */
    async (req: Request, accessToken: String, refreshToken: String, profile: any, done: VerifyCallback) => {
        console.log("Profile:", profile);
        const user = await userModel.findOrCreate({
            id: profile.id,
            username: profile.username,
            email: profile.emails && profile.emails[0].value,
        });
        done(null, user);
        
    },
    
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
