var express = require('express');
var router = express.Router();
const { registerUser, loginUser, getUserData } = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/data', getUserData);

module.exports = router;
