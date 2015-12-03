var User = require('./controller/user'),
    Login = require('./controller/login'),
    Static = require('./static'),
    ToDoListTemplate = require('./controller/toDoListTemplate');

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
    {method: 'GET', path: '/createToDoListTemplate', config: ToDoListTemplate.createToDoListTemplate},
    {method: 'POST', path: '/createToDoListTemplate', config: ToDoListTemplate.create},
    {method: 'POST', path: '/user/create', config: User.create},
    {method: 'GET', path: '/user/get/{id}', config: User.getOne},
    {method: 'GET', path: '/user/getAll', config: User.getAll},
];