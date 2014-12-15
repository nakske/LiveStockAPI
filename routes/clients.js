var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();


/* GET clients listing. */
router.get('/', function(req, res) {

  var Client = mongoose.model('Client');

  Client.find(function (err, clients) {
    if (err) return console.error(err);

      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
      res.setHeader('Access-Control-Allow-Origin', 'http://livestockhq.azurewebsites.net');
      res.json(clients);
  })


});

module.exports = router;
