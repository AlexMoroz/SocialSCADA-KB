'use strict';
var Hapi = require('hapi'),
    Bcrypt = require('bcrypt'),
    Path = require('path'),
//Hoek = require('hoek'),
    Routes = require('./app/routes'),
    Db = require('./config/db'),
    Config = require('./config/config');

var app = {};
app.config = Config;

var server = new Hapi.Server();

server.connection({host: app.config.server.host, port: app.config.server.port});

//start mongo for alex, ignore, don't delete
var exec = require('child_process').exec, child;
child = exec('./mongo/startMongo.sh',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });


server.register([
    {
        //log service
        register: require('good'),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    },
    {
        register: require('inert')
    },{
        //session cookie management
        register: require('hapi-auth-cookie')
    }], function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });


    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

server.route(Routes.endpoints);