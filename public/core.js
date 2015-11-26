'use strict';

/* defining the app */
var app = angular.module('socialscadakb', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/public/views/login.html',
            controller: 'loginCtrl'
        }),
        $routeProvider.when('/home', {
            templateUrl: '/public/views/home.html',
            controller: 'homeCtrl'
        }),
        $routeProvider.when('/createToDoListTemplates', {
            templateUrl: '/public/views/createToDoListTemplates.html',
            controller: 'createToDoListTemplatesCtrl'
        }),
        $routeProvider.when('/manageToDoListTemplates', {
            templateUrl: '/public/views/manageToDoListTemplates.html',
            controller: 'manageToDoListTemplatesCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    });
