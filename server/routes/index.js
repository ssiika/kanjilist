var express = require('express');
var router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');

/* GET home page. */


router.get('/', indexController.kanjiRead);

router.post('/addkanji', indexController.kanjiAdd);

module.exports = router;
