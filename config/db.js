'use strict';

var Mongoose = require('mongoose'),
    config = require('./config');

//Mongoose.connect(config.database.url);
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.mongoose = Mongoose;
exports.db = db;
