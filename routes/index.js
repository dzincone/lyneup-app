var express = require('express');
var router = express.Router();
var dataApi = require("../data/mongoose.js");
// var jwt = require('jsonwebtoken');
var jwt = require('../services/jwt.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register User
router.post("/register", function(req, res, next){
  dataApi.registerUser(req.body).then(function(data){
    var payload = {
      iss: req.hostname,
      sub: data._id
    }
    var token = jwt.encode(payload, process.env.SECRET)
    res.send({
      user: data.toJson(),
      success: true,
      token: token
      })
  })
})
// Login User
router.post("/login", function(req, res, next){
  dataApi.loginUser(req.body).then(function(data){
    res.send({
      id_token: createToken(data)
      })
  })
})




module.exports = router;
