import passport from "passport";
import UserModel from "./Schemas/User";
import mongoose from "./mongo";

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/API/auth/google/callback"
    },
    async function(profile, done) {
      try {
        const userFound = await UserModel.findOne({ googleId: profile.id });
        if (!userFound) {
          await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            googleId: profile.id,
            mail: profile.emails[0].value,
            verifiedMail: profile.emails[0].verified,
            userName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            password: "",
            picture: profile.photos.value
          });
        }
      } catch (e) {
        console.error(e.message);
      }
      done(null, profile);
    }
  )
);

export default passport;
