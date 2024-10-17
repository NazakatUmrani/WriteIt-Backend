const router = require('express').Router()
const User = require('../Models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = require('../middleware/fetchUser');

// Create a new user using: POST "/api/auth/signup". Doesn't require Auth
router.post('/signup', [
        body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
        try {
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }

                const salt = bcrypt.genSaltSync(10); // Generate a salt
                const hash = bcrypt.hashSync(req.body.password, salt); // Hash the password
                req.body.password = hash; // Set the password to hash

                // Create a new user
                let user = await User.findOne({ email: req.body.email });
                if (user) return res.status(400).json({ error: "Sorry a user with this email already exists" });
                user = User(req.body);
                await user.save();

                // Create a JWT Token
                const data = { user: { id: user.id } };
                const authToken = jwt.sign(data, JWT_SECRET);

                res.status(200).send({ authToken });
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

// Signin using: POST "/api/auth/signin". No Auth required
router.post('/signin', [
        body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
        try {
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }

                // Check if user exists
                let user = await User.findOne({ email: req.body.email });
                if (!user) return res.status(400).json({ error: "Please enter valid credentials" });
                const comparePassword = bcrypt.compareSync(req.body.password, user.password);
                if (!comparePassword) return res.status(400).json({ error: "Please enter valid credentials" });

                // Create and return a token
                const data = { user: { id: user.id } };
                const authToken = jwt.sign(data, JWT_SECRET);
                res.status(200).send({ authToken });
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

// Authenticate a user using: POST "/api/auth/authuser". No Auth required
router.post('/authuser', fetchUser, async (req, res) => {
        try {
                // Check if user exists
                const user = await User.findById(req.user.id).select('-password');
                if (!user) return res.status(400).json({ error: "Please enter valid credentials" });
                res.send(user);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

module.exports = router