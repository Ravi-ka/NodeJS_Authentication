import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../src/features/user/models/user.schema.js";
import { compare } from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

export default passport;
