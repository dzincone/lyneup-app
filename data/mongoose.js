var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI);

// User Schema
var userSchema = new mongoose.Schema({
  firstName:  String,
  lastName:  String,
  username: String,
  isAdmin: Boolean,
  isCoach: Boolean,
  isPlayer: Boolean,
  emai: String
});
// League Schema
var leagueSchema = new mongoose.Schema({
  adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  leagueName: String,
  divisions: [],
  locations: [],
  startDate: Date,
  endDate: Date,
  coachesEmails: []
});
// Division Schema
var divisionSchema = new mongoose.Schema({
  name: String,
  grade: String,
  gender: String,
  games: [],
  teams: []
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

  // Get User
  getUser: function(name){
    return Users.findOne({firstName: name});
  }

};
