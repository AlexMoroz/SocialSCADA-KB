var User = require('./controller/user'),
    Login = require('./controller/login'),
    Static = require('./static'),
    ToDoList = require('./controller/toDoList'),
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
    {method: 'GET', path: '/createToDoListTemplate', config: ToDoListTemplate.createToDoListTemplate},
    {method: 'POST', path: '/createToDoListTemplate', config: ToDoListTemplate.create},
    {method: 'POST', path: '/user/create', config: User.create},
    {method: 'GET', path: '/user/getActiveUser', config: User.getActiveUser},
    {method: 'GET', path: '/user/get/{id}', config: User.getOne},
    {method: 'GET', path: '/toDoList/getAll', config: ToDoList.getAll},
    {method: 'POST', path: '/toDoList/search', config: ToDoList.search},
    {method: 'POST', path: '/toDoList/create', config: ToDoList.create}

];