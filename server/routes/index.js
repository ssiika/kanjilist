var express = require('express');
var router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController);

module.exports = router;
