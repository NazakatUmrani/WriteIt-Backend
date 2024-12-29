const router = require("express").Router();
const { body } = require("express-validator");
const { signup, login, logout } = require("../Controllers/auth.controller");

// Create a new user using: POST "/api/auth/signup". Doesn't require Auth
router.post("/signup",
  [
    body("name", "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);

// Login using: POST "/api/auth/login". No Auth required
router.post("/login", [body("email", "Enter a valid email").isEmail()], login);

// Logout using: GET "/api/auth/logout". No Auth required
router.get("/logout", logout);

module.exports = router;