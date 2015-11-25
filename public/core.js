'use strict';

var name = '';

/* defining the app */
var app = angular.module('socialscadakb', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/public/partials/login.html',
            controller: 'loginCtrl',
        }),
        $routeProvider.when('/home', {
            templateUrl: '/public/partials/home.html',
            controller: 'homeCtrl',
        });
        $routeProvider.otherwise({redirectTo: '/'});
    });
