const User = require('../models/userSchema');
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
            expiresIn: "30d"
        });
        res.cookie('authToken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
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
        res.clearCookie('authToken', {
            sameSite: 'none',
            secure: true
        });
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

// Verifying user identity
const identifyUser = async (req, res) => {
    try {
        const { email, dob } = req.body;
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return res.status(401).send("User doesn't exist");
        };
        if (isUserExist.dob !== dob) {
            console.log(isUserExist.dob, dob);
            return res.status(401).send('Invalid dob provided');
        };
        const token = jwt.sign({ id: isUserExist._id }, process.env.SECRET_KEY, {
            expiresIn: 60 * 2
        });
        res.cookie('resetToken', token, {
            maxAge: 60000 * 2,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.status(200).send('User identified');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    };
};

// resetting password
const resetPassword = async (req, res) => {
    try {
        const token = req.cookies.resetToken;
        if (!token) {
            return res.status(404).send('Authorization failed, token not found');
        };
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        const id = verifiedToken.id;
        const hash = bcrypt.hashSync(req.body.password, salt);
        // updateOne doesn't return object whereas findOneAndUpdate/findByIdAndUpdate returns updated object
        await User.updateOne({ _id: id }, { $set: { password: hash } });
        res.clearCookie('resetToken', {
            sameSite: 'none',
            secure: true
        });
        res.status(200).send('Password reset successful');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    };
};

module.exports = { getHome, postRegister, postLogin, getUser, logout, verify, identifyUser, resetPassword };