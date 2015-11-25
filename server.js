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

server.connection({ host: app.config.server.host, port: app.config.server.port });


//server.register(require('vision'), function (err) {
//
//    Hoek.assert(!err, err);
//
//    server.views({
//        engines: {
//            html: require('handlebars')
//        },
//        relativeTo: __dirname,
//        path: './views',
//        layout: true,
//        layoutPath: Path.join(__dirname, 'views/layout'),
//        //layoutPath: './views/layout',
//        helpersPath: './views/helpers'
//    });
//});

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

var validate = function (request, username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, {id: user.id, name: user.name});
    });
};


server.register([{
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
    },
    {
    //basic authentication
    register: require('hapi-auth-basic')
}, {
    //role based access control
    register: require('hapi-rbac')
}, {
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

    server.auth.strategy('simple', 'basic', {validateFunc: validate});


    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

server.route(Routes.endpoints);