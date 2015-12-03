'use strict';

/* defining the app */
var app = angular.module('socialscadakb', ['ui.router', 'ngMaterial'])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
        function($httpProvider, $stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('nav', {
                    templateUrl: '/public/templates/nav.html',
                    abstract: true,
                })
                .state('home', {
                    url: '/home',
                    parent: 'nav',
                    templateUrl: '/public/views/home.html',
                    controller: 'homeCtrl'
                })
                .state('sensorList', {
                    url: '/sensorList',
                    parent: 'nav',
                    templateUrl: '/public/views/listSensors.html',
                    controller: 'sensorCtrl'
                })
                .state('createUser', {
                    url: '/createUser',
                    parent: 'nav',
                    templateUrl: '/public/views/createUser.html',
                    controller: 'userCtrl'
                })
                .state('createToDoListTemplates', {
                    url: '/createToDoListTemplates',
                    parent: 'nav',
                    templateUrl: '/public/views/createToDoListTemplates.html',
                    controller: 'createToDoListTemplatesCtrl'
                })
                .state('manageToDoListTemplates', {
                    url: '/manageToDoListTemplates',
                    parent: 'nav',
                    templateUrl: '/public/views/manageToDoListTemplates.html',
                    controller: 'manageToDoListTemplatesCtrl'
                })
                .state('login', {
                    url: '/',
                    templateUrl: '/public/views/login.html',
                    controller: 'loginCtrl'
                });

            $urlRouterProvider.otherwise('/');
        }
    ]);

app.service('MessageService', function() {
    var displayMessage;
    this.setMessage = function(message) {
        displayMessage = message;
    }

    this.getMessage = function() {
        return displayMessage;
    }
});

app.service('UserService', function() {
    var activeUser;
    this.setUser = function(user) {
        activeUser = user;
    }

    this.getUser = function() {
        return activeUser;
    }
});
