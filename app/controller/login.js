'use strict';

//TODO: add rbac

var Joi = require('joi'),
    Boom = require('boom'),
    User = require('../model/user').User,
    mongoose = require('mongoose');

var users = {
    johnny: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    },
    john: {
        id: 'john',
        password: 'password',
        name: 'John Doe'
    }
};

exports.home = {
    handler: function (request, reply) {
        return reply({ name: request.auth.credentials.name });
    },
    auth: 'session'
};

exports.login = {
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            return reply({ success: true, name: request.auth.credentials.name });
        }

        var message = '';
        var account = null;

        if (request.method === 'post') {

            if (!request.payload.username || !request.payload.password) {

                message = 'Missing username or password';
            }
            else {
                account = users[request.payload.username];
                if (!account ||
                    account.password !== request.payload.password) {

                    message = 'Invalid username or password';
                }
            }
        }

        if (request.method === 'get' || message) {

            return reply({ success: false, message: message });
        }

        request.auth.session.set(account);
        return reply({ success: true, name: request.payload.username });
    },
    auth: {mode: 'try', strategy: 'session'},
    plugins: {'hapi-auth-cookie': {redirectTo: false}}
};

exports.logout = {
    handler: function (request, reply) {
        request.auth.session.clear();
        return reply({ message: "logout"});
    },
    auth: 'session'
};

exports.superuser = {
    handler: function (request, reply) {
        reply('hello, ' + request.auth.credentials.name);
    },
    auth: 'simple',
    plugins: {
        rbac: {
            target: ['any-of', {type: 'group', value: 'readers'}],
            apply: 'deny-overrides', // Combinatory algorithm
            rules: [
                {
                    target: ['any-of', {type: 'username', value: 'bad_guy'}],
                    effect: 'deny'
                },
                {
                    effect: 'permit'
                }
            ]
        }
    }
}