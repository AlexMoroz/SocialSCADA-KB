'use strict';


var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;


var UserSchema = new Schema({

        _id: {type: String, unique: true, required: true},
        firstname: {type: String},
        lastname: {type: String},
        email: {type: String},
        password: {type: String},
        admin: {type: Boolean}

    },
// mongoose adds an s at the end of the collection name
// to force it using another collection specify here
    {collection: 'user'});

var user = mongoose.model('user', UserSchema);

module.exports = {
    User: user
};