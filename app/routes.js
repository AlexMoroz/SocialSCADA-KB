var User = require('./controller/user'),
    Login = require('./controller/login'),
    Static = require('./static'),
    ToDoListTemplates = require('./controller/toDoListTemplates'),
    Sensor = require('./controller/sensor');

exports.endpoints = [

    // static
    {method: 'GET', path: '/{param*}', config: Static.getIndex},
    {method: 'GET', path: '/public/{param*}', config: Static.getPublicFolder},

    // API server endpoints
    {method: 'GET', path: '/home', config: Login.home},
    {method: 'GET', path: '/login', config: Login.login},
    {method: 'POST', path: '/login', config: Login.login},
    {method: 'GET', path: '/logout', config: Login.logout},
    {method: 'GET', path: '/superuser', config: Login.superuser},
    {method: 'GET', path: '/createToDoListTemplates', config: ToDoListTemplates.createToDoListTemplates},
    {method: 'POST', path: '/createSensor', config: Sensor.create}
];