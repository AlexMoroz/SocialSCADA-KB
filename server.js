'use strict';
var Hapi = require('hapi');
var Bcrypt = require('bcrypt');

var server = new Hapi.Server();
server.connection({ port: 8080 });

var users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

var validate = function (request, username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
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
}, {
    //basic authentication
    register: require('hapi-auth-basic')
},{
    //role based access control
    register: require('hapi-rbac')
}], function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
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
    });


    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

//all info here http://hapijs.com/tutorials