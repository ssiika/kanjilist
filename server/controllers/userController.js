const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const KanjiList = require('../models/kanji');
const joyoJson = require('../kanji-output.json');


exports.registerUser = asyncHandler(async function(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).send('Please provide a username and password');
    }

    const userAlreadyExists = await User.findOne({username});

    if (userAlreadyExists) {
        return res.status(400).send('User already exists');
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPw
    })

    if (!user) {
        return res.status(400).send('Invalid user data');
    }

    //Create kanji list for new user

    const kanjiList = await KanjiList.create({
        user: user._id,
        joyoList: joyoJson,
        addedList: []
    })

    if (!kanjiList) {
        return res.status(400).send('Could not create kanji list');
    }
    res.status(201).send({
        username,
        token: generateToken(user._id),
    });
  
});

exports.loginUser = asyncHandler(async function(req, res, next) {
    const { username, password } = req.body;

    const userDetails = await User.findOne({ username });

    if (userDetails && (await bcrypt.compare(password, userDetails.password))) {
        res.send({
            username,
            token: generateToken(userDetails._id),
        });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

exports.getUserData = asyncHandler(async function(req, res, next) {

    const { _id, username } = await User.findById(req.user._id);

    res.status(200).send(`${ _id }, ${ username }`);
});

// Generate web token

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET)
}

