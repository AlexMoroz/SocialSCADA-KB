'use strict';

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types,
    Schema = mongoose.Schema;

var ToDoListSchema = new Schema({

        tags: [{
            value: {type: String}
        }],
        todos: [{
            name: {type: String},
            description: {type: String}
        }]

    },
    // mongoose adds an s at the end of the collection name
    // to force it using another collection specify here
    { collection: 'todolist'} );

var toDoList = mongoose.model('toDoList', ToDoListSchema);

module.exports = {
    ToDoList: toDoList
};