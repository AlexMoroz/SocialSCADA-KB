'use strict';

//TODO: add rbac

var Joi = require('joi'),//why do we need it?
    Boom = require('boom'),
    User = require('../model/user').User,
    mongoose = require('mongoose');


exports.getAll = {
    handler: function (request, reply) {
        User.find(function (err, user) {
            if (!err) {
                return reply(user);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.getOne = {
    handler: function (request, reply) {
        User.find({"_id": request.params.id}, function (err, user) {
            if (!err) {
                return reply(user);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.create = {
    handler: function (request, reply) {
        var user = new User();
        user.firstname = request.payload.firstname;
        user.lastname = request.payload.lastname;
        user.email = request.payload.email;
        user.admin = false;
        //TODO: send password by email

        //TODO: use autoincrement
        //User.count(function(err, num) {
        //    start with 1
            //user._id = num+1;
            user.save(function (err, user) {
                if (!err) {
                    return reply(user); // HTTP 201
                }
                if (11000 === err.code || 11001 === err.code) {
                    return reply(Boom.forbidden("please provide another user id, it already exist"));
                }
                return reply(Boom.forbidden(err)); // HTTP 403
            });
        //});
    }
};

exports.update = {
    validate: {
        payload: {
            username: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        User.findOne({'userId': request.params.userId}, function (err, user) {
            if (!err) {
                user.username = request.payload.username;
                user.save(function (err, user) {
                    if (!err) {
                        return reply(user); // HTTP 201
                    }
                    if (11000 === err.code || 11001 === err.code) {
                        return reply(Boom.forbidden("please provide another user id, it already exist"));
                    }
                    return reply(Boom.forbidden(err)); // HTTP 403
                });
            }
            else {
                return reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.remove = {
    handler: function (request, reply) {
        User.findOne({'userId': request.params.userId}, function (err, user) {
            if (!err && user) {
                user.remove();
                return reply({message: "User deleted successfully"});
            }
            if (!err) {
                return reply(Boom.notFound());
            }
            return reply(Boom.badRequest("Could not delete user"));
        });
    }
};

exports.removeAll = {
    handler: function (request, reply) {
        mongoose.connection.db.dropCollection('users', function (err, result) {
            if (!err) {
                return reply({message: "User database successfully deleted"});
            }
            return reply(Boom.badRequest("Could not delete user"));
        });
    }
};
