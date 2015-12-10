'use strict';

var Boom = require('boom'),
    Bcrypt = require('bcrypt'),
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
    },
    auth: 'session'
};

exports.getOne = {
    handler: function (request, reply) {
        User.find({"_id": request.params.id}, function (err, user) {
            if (!err) {
                return reply(user);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    },
    auth: 'session'
};

exports.create = {
    handler: function (request, reply) {
        var user = new User();
        user.firstname = request.payload.firstname;
        user.lastname = request.payload.lastname;
        user.email = request.payload.email;
        user.admin = request.admin;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(request.payload.password, salt, function(err, hash) {
                if(!err) {
                    user.password = hash;
                    user.save(function (err, user) {
                        if (!err) {
                            return reply(user); // HTTP 201
                        }
                        if (11000 === err.code || 11001 === err.code) {
                            return reply(Boom.forbidden("please provide another user id, it already exist"));
                        }
                        return reply(Boom.forbidden(err)); // HTTP 403
                    });
                } else {
                    reply(Boom.badImplementation(err));
                }
            });
        });

    },
    auth: 'session'
};

exports.getActiveUser = {
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            reply(request.auth.artifacts);
        } else
            reply(Boom.badRequest("Not authorized access."));
    },
    auth: 'session'
};

