var express = require('express');
var router = express.Router();
const { registerUser, loginUser, getUserData } = require('../controllers/userController');

// Import authentication middleware
const { authenticate } = require('../middleware/tokenAuth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/data', authenticate, getUserData);

module.exports = router;
