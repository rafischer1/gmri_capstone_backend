var express = require('express');
var router = express.Router();
const userModel = require("../models/userModel.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel
    .getAll()
    .then(response => res.send(response))
    .catch(err => next(err));
});

module.exports = router;
