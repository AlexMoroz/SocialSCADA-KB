'use strict';

var Mongoose = require('mongoose'),
    config = require('./config'),
    autoIncrement = require('mongoose-auto-increment');

//Mongoose.connect(config.database.url);
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
var db = Mongoose.connection;
autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.mongoose = Mongoose;
exports.db = db;
