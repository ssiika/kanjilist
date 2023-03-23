const Kanji = require('../models/kanji');

exports.kanjiRead = function(req, res, next) {
    Kanji.find()
        .sort([['_id', 'ascending']])
        .exec(function (err, kanji_list) {
            if (err) { return next(err); }
            res.send(kanji_list);
        })
}

exports.kanjiAdd = function(req, res, next) {
    const kanji = new Kanji({
        kanji: req.body.kanji,
        type: req.body.type, 
        known: req.body.known
    })
    kanji.save((err) => {
        if (err) {
            return next(err);
        }
        res.send('succes');
    })
}