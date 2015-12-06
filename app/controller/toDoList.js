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
            ToDoList.find({ tags: { "$in" : request.payload} },function (err, data) {
                if (!err) {
                    return reply(data);
                }
                return reply(Boom.badImplementation(err)); // 500 error
            });
        }

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