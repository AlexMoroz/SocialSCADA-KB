'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PlaceHierarchyEntrySchema = require('./place').PlaceHierarchyEntrySchema;


var SensorSchema = new Schema({

    type: {type: String, required: true},
    place: [PlaceHierarchyEntrySchema]

},
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'sensor'} );

var sensor = mongoose.model('sensor', SensorSchema);

module.exports = {
    Sensor: sensor
};