'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceHierarchyEntrySchema = new Schema({

    type: {type: String, required: true},
    value: {type: String, required: true},
    child: {type: Boolean, required: true},
    parent: {type: Boolean, required: true},
    level: {type: Number, required: true}


},
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'places'} );

var place = mongoose.model('place', PlaceHierarchyEntrySchema);

module.exports = {
    PlaceHierarchyEntry: place,
    PlaceHierarchyEntrySchema: PlaceHierarchyEntrySchema
};
