import passport from "passport";

export const authenticationMiddleware = (req, res, next) => {
  passport.authenticate(["local", "google"], (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If user is not authenticated through any strategy, redirect to login page
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // If authentication succeeds, redirect to homepage
      return res.redirect("/homepage");
    });
  })(req, res, next);
};
