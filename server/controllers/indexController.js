const KanjiList = require('../models/kanji');
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const User = require('../models/user');


exports.kanjiRead = asyncHandler(async function(req, res, next) {
    const kanjiList = await KanjiList.findOne({user: req.user._id});
    res.send(kanjiList.list);
})

exports.kanjiAdd = [
    // Request must contain the user id as well as the kanji, type and known parameters

    body("kanji")
        .trim()
        .isLength({ min: 1, max: 1})
        .escape()
        .isAlpha("ja-JP")
        .withMessage("Kanji must be one character"),
    body("type")
        .trim()
        .isLength({ min: 1, max: 1})
        .isNumeric()
        .withMessage("Must be 1 digit number"),
    body("known")
        .isBoolean()
        .withMessage('Must be boolean'),

    asyncHandler(async function(req, res, next) {
        // Check for validation errors

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.send( errors.array() );
            return;
        }

        // Validation successful 

        // Check for dupliate kanji already in list
        const kanjiExists = await KanjiList.findOne({user: req.user._id}, {list: {$elemMatch: {kanji: req.body.kanji}}});

        if (kanjiExists.list.length !== 0) {
            res.status(400);
            throw new Error('Kanji already in list');
        }

        await KanjiList.updateOne({user: req.user._id},{$push:{"list":{
            kanji: req.body.kanji,
            type: req.body.type, 
            known: req.body.known
        }}})
        res.send('Kanji list updated');
    })
]