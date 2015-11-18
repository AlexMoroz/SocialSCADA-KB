'use strict';
var Hapi = require('hapi');
var Bcrypt = require('bcrypt');

var server = new Hapi.Server();
server.connection({port: 8080});

//connecting to mongodb with mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socialscada');
var db = mongoose.connection;
//check if connection is successful
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log("connected", callback);
});


/*------testing staff------*/
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

var home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome '
        + request.auth.credentials.name
        + '!</h3><br/><form method="get" action="/logout">'
        + '<input type="submit" value="Logout">'
        + '</form></body></html>');
};

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
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

    if (request.method === 'get' ||
        message) {

        return reply('<html><head><title>Login page</title></head><body>'
            + (message ? '<h3>' + message + '</h3><br/>' : '')
            + '<form method="post" action="/login">'
            + 'Username: <input type="text" name="username"><br>'
            + 'Password: <input type="password" name="password"><br/>'
            + '<input type="submit" value="Login"></form></body></html>');
    }

    request.auth.session.set(account);
    return reply.redirect('/');
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
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
/*------testing staff------*/


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
}, {
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
    server.route([{
        method: 'GET',
        path: '/superuser',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            },
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
    },
        {
            method: 'GET',
            path: '/',
            config: {
                handler: home,
                auth: 'session'
            }
        },
        {
            method: ['GET', 'POST'],
            path: '/login',
            config: {
                handler: login,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                handler: logout,
                auth: 'session'
            }
        }]);


    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});