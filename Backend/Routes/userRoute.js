const express = require('express');
const router = express.Router();
const auth = require('../Authentication/authentication');
const { body, validationResult } = require('express-validator');
const { getHome, postRegister, postLogin, getUser, logout, verify } = require('../Controllers/userController');

router.get('/', getHome);
router.post('/register', [
    // name must be at least 3 chars long
    body('name', 'Name should must contains atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Please enter a valid email id').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password should must contains atleast 5 characters').isLength({ min: 5 })
], postRegister);
router.post('/login', body('email', 'Please enter a valid email id').isEmail(), postLogin);
router.get('/get', auth, getUser);
router.get('/logout', auth, logout);
router.get('/verify', auth, verify);

module.exports = router;