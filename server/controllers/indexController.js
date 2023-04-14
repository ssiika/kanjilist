const KanjiList = require('../models/kanji');
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const User = require('../models/user');


exports.kanjiRead = asyncHandler(async function(req, res, next) {
    const kanjiList = await KanjiList.findOne({user: req.user._id});
    res.send(kanjiList.joyoList.concat(kanjiList.addedList));
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
            res.status(400).send( errors.array() );
            return;
        }

        // Validation successful 

        // Check for dupliate kanji already in either list
        var kanjiExists = await KanjiList.findOne({user: req.user._id}, {joyoList: {$elemMatch: {kanji: req.body.kanji}}});

        if (kanjiExists.joyoList.length !== 0) {
            res.status(400);
            throw new Error('Kanji already in list');
        }

        kanjiExists = await KanjiList.findOne({user: req.user._id}, {addedList: {$elemMatch: {kanji: req.body.kanji}}});

        if (kanjiExists.addedList.length !== 0) {
            res.status(400);
            throw new Error('Kanji already in list');
        }

        // No duplicate, update kanji 
        
        await KanjiList.updateOne({user: req.user._id},{$push:{"addedList":{
            kanji: req.body.kanji,
            type: req.body.type, 
            known: req.body.known
        }}})
        res.send({kanji: req.body.kanji,
        type: "1",
        known: "true"
        });
    })
]

exports.kanjiDelete = asyncHandler(async function(req, res, next) {
    // Check if kanji exists

    const kanjiExists = await KanjiList.findOne({user: req.user._id}, {addedList: {$elemMatch: {kanji: req.params.kanji}}});

        if (kanjiExists.addedList.length === 0) {
            res.status(400);
            throw new Error('Kanji not in list');
        }

    const kanjiList = await KanjiList.updateOne({user: req.user._id}, {$pull: {addedList: {kanji: req.params.kanji}}});
    res.send(req.params.kanji);
})

exports.kanjiUpdate = asyncHandler(async function(req, res, next) { 
    // Request should contain the kanji, type and desired known value to be updated to
    if (!req.body.kanji || !req.body.type || !req.body.known) {
        res.status(400);
        throw new Error('Please provide kanji, type and known parameters');
    }

    // Check that known is boolean 
    if (req.body.known !== 'true' && req.body.known !== 'false') {
        res.status(400);
        throw new Error('Please provide the known parameter with a boolean string');
    }

    if (req.body.type == 1) {
        // Kanji is in the joyo list array

        // Check if kanji is already in list
        const kanjiExists = await KanjiList.findOne({user: req.user._id}, {joyoList: {$elemMatch: {kanji: req.body.kanji}}});

        if (kanjiExists.joyoList.length === 0) {
            res.status(400);
            throw new Error('Kanji not in list');
        }
        const kanjiUpdate = await KanjiList.updateOne({user: req.user._id, "joyoList.kanji": req.body.kanji}, {$set: {"joyoList.$.known": req.body.known }});

        res.send('Kanji updated');
        
    } else if (req.body.type == 0) {
        // Kanji is in the added list array

        // Check if kanji is already in list
        const kanjiExists = await KanjiList.findOne({user: req.user._id}, {addedList: {$elemMatch: {kanji: req.body.kanji}}});

        if (kanjiExists.addedList.length === 0) {
            res.status(400);
            throw new Error('Kanji not in list');
        }
        const kanjiUpdate = await KanjiList.updateOne({user: req.user._id, "addedList.kanji": req.body.kanji}, {$set: {"addedList.$.known": req.body.known }});

        res.send('Kanji updated');
    }  else {
        res.status(400);
        throw new Error('Type paramater has invalid value')
    }
    
})