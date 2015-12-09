'use strict';


var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;


var UserSchema = new Schema({

        _id: {type: SchemaTypes.Number, unique: true, required: true},
        firstname: {type: SchemaTypes.String},
        lastname: {type: SchemaTypes.String},
        email: {type: SchemaTypes.String},
        password: {type: SchemaTypes.String},
        admin: {type: SchemaTypes.Boolean}

    },
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'user'} );

var user = mongoose.model('user', UserSchema);

module.exports = {
    User: user
};