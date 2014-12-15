/**
 * Created by Bart on 01/12/14.
 */

var mongoose  = require('mongoose');

//var connestionString = 'mongodb://localhost/test';
var connestionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

console.log('connecting to ' + connestionString);
mongoose.connect(connestionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

  var clientsSchema = mongoose.Schema({
    name: String,
    lastName: String,
    Rating: String
  });

  clientsSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
  });

  clientsSchema.virtual('name.full').set(function (name) {
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
  });

  clientsSchema.methods.speak = function () {
    var greeting = this.name
      ? "My name is " + this.name.full
      : "I don't have a name";
    console.log(greeting);
  };

    mongoose.model('Client', clientsSchema);


    var Client = mongoose.model('Client');

/*
    var James = new Client({ name: 'James', lastName: 'Hetfield' });
    James.save(function (err) {
      if (err) console.error.bind('An error occurred saving James!')
      James.speak();
    });
*/
});
