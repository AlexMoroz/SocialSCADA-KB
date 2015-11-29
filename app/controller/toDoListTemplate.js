exports.createToDoListTemplate = {
    handler: function (request, reply) {
        return reply();
    }
};

var ToDoListTemplate = require('../model/toDoListTemplate').ToDoListTemplate,
    Boom = require('boom');

exports.create = {
    handler: function (request, reply) {
        var toDoListTemplate = new ToDoListTemplate(request.payload);
        toDoListTemplate.save(function (err, toDoListTemplate) {
            if (!err) {
                return reply({ message: "toDoListTemplate created" });
            }
            if (11000 === err.code || 11001 === err.code) {
                return reply(Boom.forbidden("please provide another toDoListTemplate id, it already exist"));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    }
};
