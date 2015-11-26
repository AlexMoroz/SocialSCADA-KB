'use strict';

var mongoose = require('mongoose')
    require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;

var SensorSchema = new Schema({

    type: {type: String, required: true},
    place: {
        street: {type: String},
        number: {type: Number},
        building: {type: String},
        room: {type: String},
        longitude: {type: SchemaTypes.Double},
        latitude: {type: SchemaTypes.Double}
    }

},
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'sensor'} );

var sensor = mongoose.model('sensor', SensorSchema);

module.exports = {
    Sensor: sensor
};