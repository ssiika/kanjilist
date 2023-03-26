const fs = require("fs");

let kanji_list = [];
// Read file
fs.readFile('./kanji-raw.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    for (let i = 0; i < data.length; i++) {
        kanji_list.push({
            kanji: data[i], 
            type: 1, 
            known: false,
        })
    }

    fs.writeFile('./kanji-output.json', JSON.stringify(kanji_list), err => {
        if (err) {
            console.error(err);
        }
    })
});
