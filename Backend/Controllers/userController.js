const User = require('../Models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const salt = 10;

// This is default route or home route
const getHome = (req, res) => {
    res.json({
        status: 200,
        message: 'Welcome to the server.'
    });
};

// Handling user registration and safely storing user data to the database
const postRegister = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        // Handling new registration
        const { name, email, dob, password } = req.body;
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return res.status(409).send('User already exist, please login');
        };
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: name,
            email: email,
            dob: dob,
            password: hash
        });
        await newUser.save();
        res.status(201).send('User registration succesfull, please login');
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

// Handling user login and generating token for future verification
const postLogin = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return res.status(400).json({ errors: errors.array() });
            return res.status(400).json(errors.errors[0].msg);
        };
        // Handling new registration
        const { email, password } = req.body;
        const isUserExist = await User.findOne({ email: email });
        if (!isUserExist) {
            return res.status(401).send('Invalid credentials');
        };
        const isMatch = await bcrypt.compare(password, isUserExist.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        };
        const token = jwt.sign({ id: isUserExist._id }, process.env.SECRET_KEY, {
            expiresIn: "7d"
        });
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 10080 * 1000
        });
        res.status(200).send('User logged in succesfully')
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

// Fething user details from database and sending to frontend
const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};
// Logging out user
const logout = async (req, res) => {
    try {
        res.clearCookie('authToken');
        res.status(200).send('User logged out succesfully');
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};
// User verification for frontend use
const verify = async (req, res) => {
    try {
        res.status(200).send('success');
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

/* 
      User.create({
        username: req.body.username,
        password: req.body.password,
      }).then(user => res.json(user));
*/

module.exports = { getHome, postRegister, postLogin, getUser, logout, verify };