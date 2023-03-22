const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kanji = new Schema(
    {
        kanji: {
            type: String
        },
        type: {
            type: Number
        }, 
        known: {
            type: Boolean
        }
    },
    { collection: "Joyo Jinmeiyo List"}
);

module.exports = mongoose.model("kanji", kanji);