const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const KanjiList = new Schema(
    {
        user: {
            type: String
        },
        joyoList: {
            type: Array
        }, 
        addedList: {
            type: Array
        }
    },
    { collection: "List"}
);

module.exports = mongoose.model("kanji", KanjiList);