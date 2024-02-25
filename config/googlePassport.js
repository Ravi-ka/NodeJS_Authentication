import passport from "passport";
import { UserModel } from "../src/features/user/models/user.schema.js";
import GoogleStrategy from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "578017627814-dduh0n7k2m01v7549boeum0og9e8qpf7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:2300/auth/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, profile);
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          let newUser = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: "null",
            password: "null",
          });
          user = await newUser.save();
        }
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
