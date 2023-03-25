const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');


exports.registerUser = asyncHandler(async function(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password ) {
        res.status(400);
        throw new Error('Please provide a username and password')
    }

    const userAlreadyExists = await User.findOne({username});

    if (userAlreadyExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPw
    })

    if (user) {
        res.status(201).send('success')
    }   else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

exports.loginUser = asyncHandler(async function(req, res, next) {
    res.send('Login user');
});

exports.getUserData = asyncHandler(async function(req, res, next) {
    res.send('Get data');
});