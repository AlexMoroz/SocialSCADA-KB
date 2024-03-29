'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;

var ToDoListSchema = new Schema({

        name: String,
        tags: [String],
        todos: [{
            name: {type: String},
            description: {type: String}
        }],
        params: [{
            key: {type: String},
            value: {type: String}
        }]

    },
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'todolist'} );

var toDoList = mongoose.model('toDoList', ToDoListSchema);

module.exports = {
    ToDoList: toDoList
};