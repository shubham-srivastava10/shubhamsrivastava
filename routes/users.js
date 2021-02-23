var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
let cors = require('cors');

/* GET users listing. */
router.get('/', cors(), userController.index);
router.post('/', cors(), userController.new);

module.exports = router;
