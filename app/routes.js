var User = require('./controller/user'),
    Login = require('./controller/login'),
    Static = require('./static'),
    ToDoList = require('./controller/toDoList'),
    AlarmMonitoringSystem = require('./controller/alarmMonitoringSystem');

exports.endpoints = [

    // static
    {method: 'GET', path: '/{param*}', config: Static.getIndex},
    {method: 'GET', path: '/public/{param*}', config: Static.getPublicFolder},

    // API server endpoints
    {method: 'GET', path: '/home', config: Login.home},
    {method: 'GET', path: '/login', config: Login.login},
    {method: 'POST', path: '/login', config: Login.login},
    {method: 'GET', path: '/logout', config: Login.logout},
    {method: 'POST', path: '/ToDoList', config: ToDoList.create},
    {method: 'POST', path: '/user/create', config: User.create},
    {method: 'GET', path: '/user/getActiveUser', config: User.getActiveUser},
    {method: 'GET', path: '/user/get/{id}', config: User.getOne},
    {method: 'GET', path: '/ToDoList', config: ToDoList.getAll},
    {method: 'GET', path: '/ToDoList/search', config: ToDoList.searchAPI},
    {method: 'POST', path: '/AlarmMonitoringSystem/triggerAlarm', config: AlarmMonitoringSystem.triggerAlarm},
    {method: 'GET', path: '/AlarmMonitoringSystem/alarmPanel', config: AlarmMonitoringSystem.alarmPanel}
];