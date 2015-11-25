'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    userId: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    password: {type: String},
    admin: {type: Boolean}

});

var user = mongoose.model('user', UserSchema);

module.exports = {
    User: user
};