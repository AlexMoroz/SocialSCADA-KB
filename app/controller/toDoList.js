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
        if(request.params.tags == '') {
            ToDoList.find(function (err, data) {
                if (!err) {
                    return reply(data);
                }
                return reply(Boom.badImplementation(err)); // 500 error
            });
        }
        else {
            var textArray = request.params.tags.split(' ');
            var tagArray = [];
            var text = ''
            for (text of textArray) {
                var tag = {};
                tag.value = text;
                tagArray.push(tag);
            }
            ToDoList.find({ tags: { "$in" : tagArray} },function (err, data) {
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