const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.authenticate = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedData = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedData.userId).select('-password');

            next();
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorised');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
})