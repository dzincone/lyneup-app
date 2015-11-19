var express = require('express');
var router = express.Router();
var dataApi = require("../data/mongoose.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/user", function(req, res, next){
  var name = req.query.name
  dataApi.getUser(name).then(function(user){
    res.json(user);
  })
})


module.exports = router;
