var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI);


var userSchema = new mongoose.Schema({
  first_name:  String,
  last_name:  String,
  
});

var Users = mongoose.model("Users", userSchema, "Users");

module.exports = {

  getUser: function(name){
    console.log("here it is", name);
    return Users.findOne({firstName: name});
  }

};
