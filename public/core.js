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
                .state('nav.home', {
                    url: '/home',
                    templateUrl: '/public/views/home.html',
                    controller: 'homeCtrl'
                })
                .state('nav.createSensor', {
                    url: '/createSensor',
                    templateUrl: '/public/views/createSensor.html',
                    controller: 'sensorCtrl'
                })
                .state('nav.sensorList', {
                    url: '/sensorList',
                    templateUrl: '/public/views/listSensors.html',
                    controller: 'sensorCtrl'
                })
                .state('nav.createUser', {
                    url: '/user/create',
                    templateUrl: '/public/views/createUser.html',
                    controller: 'userCtrl'
                })
                .state('nav.userProfile', {
                    url: '/user/view',
                    templateUrl: '/public/views/viewUser.html',
                    controller: 'viewUserCtrl'
                })
                //.state('nav.createUser', {  //TODO: user update
                //    url: '/user/create/:id',
                //    templateUrl: '/public/views/createUser.html',
                //    controller: 'updateUserCtrl'
                //})
                .state('nav.createToDoListTemplates', {
                    url: '/createToDoListTemplates',
                    templateUrl: '/public/views/createToDoListTemplates.html',
                    controller: 'createToDoListTemplatesCtrl'
                })
                .state('nav.manageToDoListTemplates', {
                    url: '/manageToDoListTemplates',
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
