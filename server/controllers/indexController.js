const Kanji = require('../models/kanji');
const { body, validationResult } = require("express-validator");

exports.kanjiRead = function(req, res, next) {
    Kanji.find()
        .sort([['_id', 'ascending']])
        .exec(function (err, kanji_list) {
            if (err) { return next(err); }
            res.send(kanji_list);
        })
}

exports.kanjiAdd = [
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

    (req, res, next) => {
        // Check for validation errors

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.send( errors.array() );
            return;
        }

        // Validation successful 

        const kanji = new Kanji({
            kanji: req.body.kanji,
            type: req.body.type, 
            known: req.body.known
        })
        kanji.save((err) => {
            if (err) {
                return next(err);
            }
            res.send('success');
        })
    }
]