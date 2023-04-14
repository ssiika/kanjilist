var express = require('express');
var router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');

// Import authentication middleware
const { authenticate } = require('../middleware/tokenAuth');

/* GET home page. */


router.get('/', authenticate, indexController.kanjiRead);

router.post('/', authenticate, indexController.kanjiAdd);

router.delete('/:kanji', authenticate, indexController.kanjiDelete);

router.put('/:kanji', authenticate, indexController.kanjiUpdate);

module.exports = router;
