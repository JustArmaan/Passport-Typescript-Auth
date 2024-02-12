import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import passport from "passport";
import {
    getUserByEmailIdAndPassword,
    getUserById,
  } from "../../controllers/userController";

import { userModel } from '../../models/userModel'
const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "d608f20512e664cc1807",
        clientSecret: "d9b01210e3b210cb7907177bee83bbe99121054a",
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
