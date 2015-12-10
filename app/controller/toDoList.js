'use strict';

var Boom = require('boom'),
    ToDoList = require('../model/toDoList').ToDoList,
    mongoose = require('mongoose');

exports.search = {
    handler: function (request, reply) {

        // if no tags in search request return all stored ToDoLists
        if(request.payload == []) {
            ToDoList.find(function (err, data) {
                if (!err) {
                    return reply(data);
                }
                return reply(Boom.badImplementation(err)); // 500 error
            });
        }
        else {
            ToDoList.find({ tags: { "$in": request.payload } },function (err, data) {
                if (!err) {
                    return reply(data);
                }
                return reply(Boom.badImplementation(err)); // 500 error
            });
        }

    }
};

exports.searchAPI = {
    handler: function (request, reply) {
        ToDoList.find({ tags: { $exists: true, "$in": request.payload }, $where: 'this.tags.length >= ' + request.payload.length },function (err, data) {
            if (!err) {
                return reply(data);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.getAll = {
    handler: function (request, reply) {
        ToDoList.find(function (err, data) {
            if (!err) {
                return reply(data);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.createToDoList = {
    handler: function (request, reply) {
        return reply();
    }
};

exports.create = {
    handler: function (request, reply) {
        var toDoList = new ToDoList(request.payload);
        toDoList.save(function (err, toDoList) {
            if (!err) {
                return reply({ message: "toDoList created" });
            }
            if (11000 === err.code || 11001 === err.code) {
                return reply(Boom.forbidden("please provide another toDoList id, it already exist"));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    }
};
