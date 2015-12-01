'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;

var ToDoListTemplateSchema = new Schema({

        sensor: {type: String, required: true},
        alarmtype: {type: String, required: true},
        user: {type: String, required: true},
        toDoTemplates: [{
            name: {type: String},
            description: {type: String}
        }]

    },
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'todolist_template'} );

var toDoListTemplate = mongoose.model('toDoListTemplate', ToDoListTemplateSchema);

module.exports = {
    ToDoListTemplate: toDoListTemplate
};