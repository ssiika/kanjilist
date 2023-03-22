const Kanji = require('../models/kanji');

exports.index = function(req, res, next) {
    Kanji.find()
        .sort([['_id', 'ascending']])
        .exec(function (err, kanji_list) {
            if (err) { return next(err); }
            res.send(kanji_list);
        })
}