var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI);
var bcrypt = require("bcryptjs");


// User Schema
var userSchema = new mongoose.Schema({
  firstName:  {type: String, default: ""},
  lastName:  {type: String, default: ""},
  isAdmin: {type: Boolean, default: false},
  isLeagueManager: {type: Boolean, default: false},
  isCoach: {type: Boolean, default: false},
  email: {type: String, default: ""},
  password: {type: String, default: ""}
});
// League Schema
var leagueSchema = new mongoose.Schema({
  adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  leagueName: {type: String, default: ""},
  divisions: {type: Array, default: []},
  locations: {type: Array, default: []},
  startDate: {type: Date, default: Date.now()},
  endDate: {type: Date, default: ""},
  coachesEmails: {type: Array, default: []}
});
// Division Schema
var divisionSchema = new mongoose.Schema({
  name: {type: String, default: ""},
  grade: {type: String, default: ""},
  gender: {type: String, default: ""},
  games: {type: Array, default: []},
  teams: {type: Array, default: []}
});
// Team Schema
var teamSchema = new mongoose.Schema({
  coachid: {type: mongoose.Schema.Types.ObjectId, ref: 'Coaches'},
  teamName: String,
  parentsEmails: [],
  players: [],
  logoUrl: String,
  teamName: String
});
// Coach Schema
var coachSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  teams: [],
})
// Location Schema
var locationSchema = new mongoose.Schema({
  name: String,
  streetName: String,
  city: String,
  state: String,
  availability: {}
});
// Player Schema
var playerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  number: Number,
  dob: Date
});
// Game Schema
var gameSchema = new mongoose.Schema({
  teamOneId: {type: mongoose.Schema.Types.ObjectId, ref: 'Teams'},
  teamTwoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Teams'},
  dateOfGame: Date,
  locationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Locations'}
})

userSchema.methods.toJson = function(){
  var user = this.toObject();
  delete user.password;
  return user;
}


// LyneUp Models
var Users = mongoose.model("Users", userSchema, "Users");
var Leagues = mongoose.model("Leagues", leagueSchema, "Leagues");
var Divisions = mongoose.model("Divisions", divisionSchema, "Divisions");
var Teams = mongoose.model("Teams", teamSchema, "Teams");
var Coaches = mongoose.model("Coaches", coachSchema, "Coaches");
var Locations = mongoose.model("Locations", locationSchema, "Locations");
var Players = mongoose.model("Players", playerSchema, "Players");
var Games = mongoose.model("Games", gameSchema, "Games");



module.exports = {

  // Get Fresh User
  getNewUser: function(){
      return new Promise(function(resolve, reject){
          resolve(new Users())
      })
  },
  // Get Authorized user
  getUser: function(id){
    return Users.findOne({_id: id})
  },
  // Get All Users
  getUsers: function(){
    return Users.find();
  },
  // Post User
  registerUser: function(obj){
    var hash = bcrypt.hashSync(obj.password, 8);
    obj.password = hash;
    delete obj.confirmpassword;
    return Users.findByIdAndUpdate(obj._id, obj, {upsert: true, new: true})
  },
  // Post User for Login
  loginUser: function(obj){
    return Users.findOne({email: obj.email}).then(function(data){
      var crypt = bcrypt.compareSync(obj.password, data.password);
      if (crypt){
        return data
      } else {
        console.log("passwords did not match");
      }
    })
  },
  // Get League
  getLeague: function(id){
    if(id != "New League"){
      return Leagues.findOne({_id: id});
    } else {
      return new Promise(function(resolve, reject){
          resolve(new Leagues())
      })
    }
  },
  // Get All Leagues
  getLeagues: function(){
    return Leagues.find()
  },
  // Post League
  postLeague: function(obj){
    return Leagues.update({_id: obj._id}, obj, {upsert: true})
  },
  // Get Division
  getDivision: function(id){
    if(id != "New Division"){
      return Divisions.findOne({_id: id});
    } else {
      return new Promise(function(resolve, reject){
          resolve(new Divisions())
      })
    }
  },
  // Get All Divisions
  getDivisions: function(){
    return Divisions.find()
  },
  // Get Divisions for Specific League
  getDivisionsForLeague: function(leagueId){
    return Leagues.find({_id: leagueId}).populate("divisions");
  }


};
