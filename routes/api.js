var express = require('express');
var router = express.Router();
var dataApi = require("../data/mongoose.js");
// var jwt = require('jsonwebtoken');
var jwt = require('../services/jwt.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get New User
router.get("/newUser", function(req, res, next){
  dataApi.getNewUser().then(function(user){
    res.json(user);
  })
})
// Get Authorized Users
router.get("/user", function(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send({
      message: "Sorry, you do not have access to this page"
    });
  } else {
    var token = req.headers.authorization.split(" ")[1]
    var payload = jwt.decode(token, process.env.SECRET)
    if(payload.sub){
      dataApi.getUser(payload.sub).then(function(user){
        res.json(user.toJson())
      })
    }
  }
})

// Get All Users
router.get("/users", function(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send({
      message: "Sorry, you do not have access to this page"
    });
  } else {
      dataApi.getUsers().then(function(users){
        res.json(users)
      })
  }
})
// Check Auth token
router.get("/checkAuth", function(req, res, next){
  res.json(req.headers)
})
// Get League
router.get("/league", function(req, res, next){
  if(req.query.id){
    var id = req.query.id
  } else {
    var id = "New League"
  }
  dataApi.getLeague(id).then(function(league){
    res.json(league);
  })
})
// Get All Leagues
router.get("/leagues", function(req, res, next){
  dataApi.getLeagues().then(function(leagues){
    res.json(leagues)
  })
})
// Post League
router.post("/leagues", function(req, res, next){
  dataApi.postLeague(req.body).then(function(data){
    res.send(data)
  })
})
// Get Division
  router.get("/division", function(req, res, next){
    if(req.query.id){
      var id = req.query.id;
    } else {
      var id = "New Division"
    }
    dataApi.getDivision(id).then(function(division){
      res.json(division)
    })
  })
// Get All Divisions
  router.get("/divisions", function(req, res, next){
    if(req.query.leagueId){
      var leagueId = req.query.leagueId
      dataApi.getDivisionsForLeague(leagueId).then(function(divisions){
        res.json(divisions)
      })
    } else {
        dataApi.getDivisions().then(function(divisions){
          res.json(divisions)
        })
    }
  })




module.exports = router;
