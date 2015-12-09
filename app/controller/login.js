'use strict';

var Bcrypt = require('bcrypt'),
    Boom = require('boom'),
    User = require('../model/user').User,
    mongoose = require('mongoose');

exports.home = {
    handler: function (request, reply) {
        return reply({name: request.auth.credentials.name});
    },
    auth: 'session'
};

exports.login = {
    handler: function (request, reply) {

        var message = '';
        if (request.auth.isAuthenticated) {
            return reply(request.auth.artifacts);
        }

        if (request.method === 'post') {

            if (!request.payload.email || !request.payload.password) {

                message = 'Missing username or password';
                reply(Boom.badRequest(message));
            }
            else {
                User.findOne({"email": request.payload.email}, function (err, user) {
                    if (!err) {
                        if(user == null) {
                            message = 'Incorrect login or password.';
                            reply(Boom.badRequest(message));
                            return;
                        }
                        /*
                        Bcrypt.compare(request.payload.password, user.password, function (err, isValid) {
                            if(isValid) {
                                var result = {
                                    name: user.firstname + ' ' + user.lastname,
                                    email: user.email,
                                    admin: user.admin
                                };
                                request.auth.session.set(result);
                                return reply(result);
                            } else {
                                message = 'Incorrect login or password.';
                                reply(Boom.badRequest(message));
                            }
                        });
                        */

                        if(request.payload.password == user.password) {
                            var result = {
                                name: user.firstname + ' ' + user.lastname,
                                email: user.email
                            };
                            request.auth.session.set(result);
                            return reply(result);
                        } else {
                            message = 'Incorrect login or password.';
                            reply(Boom.badRequest(message));
                        }

                    } else
                        return reply(Boom.badImplementation(err));
                });
            }
        } else {
            return reply(Boom.badRequest("Err: get request."));
        }
    },
    auth: {mode: 'try', strategy: 'session'},
    plugins: {'hapi-auth-cookie': {redirectTo: false}}
};

exports.logout = {
    handler: function (request, reply) {
        request.auth.session.clear();
        return reply({message: "Successfully logged out."});
    },
    auth: 'session'
};
