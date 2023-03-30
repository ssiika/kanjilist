const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const KanjiList = new Schema(
    {
        user: {
            type: String
        },
        list: {
            type: Array
        }, 
    },
    { collection: "Joyo List"}
);

module.exports = mongoose.model("kanji", KanjiList);