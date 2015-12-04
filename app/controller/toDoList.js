'use strict';

var Boom = require('boom'),
    ToDoList = require('../model/toDoList').ToDoList,
    mongoose = require('mongoose');

exports.create = {
    handler: function (request, reply) {
        ToDoList.find(function (err, data) {
            if (!err) {
                return reply(data);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.search = {
    handler: function (request, reply) {
        ToDoList.find(function (err, data) {
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