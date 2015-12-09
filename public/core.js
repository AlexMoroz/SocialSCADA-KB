'use strict';

/* defining the app */
var app = angular.module('socialscadakb', ['ui.router', 'ngMaterial'])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
        function ($httpProvider, $stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('nav', {
                    templateUrl: '/public/views/nav.html',
                    abstract: true,
                    controller: 'navCtrl'
                })
                .state('nav.home', {
                    url: '/home',
                    templateUrl: '/public/views/home.html',
                    controller: 'homeCtrl'
                })
                .state('nav.search', {
                    url: '/search',
                    templateUrl: '/public/views/search.html',
                    controller: 'searchCtrl'
                })
                .state('nav.createUser', {
                    url: '/user/create',
                    templateUrl: '/public/views/createUser.html',
                    controller: 'userCtrl'
                })
                .state('nav.userProfile', {
                    url: '/user/view/:id',
                    templateUrl: '/public/views/viewUser.html',
                    controller: 'viewUserCtrl'
                })
                //.state('nav.createUser', {  //TODO: user update
                //    url: '/user/create/:id',
                //    templateUrl: '/public/views/createUser.html',
                //    controller: 'updateUserCtrl'
                //})
                .state('nav.createToDoList', {
                    url: '/createToDoList',
                    templateUrl: '/public/views/createToDoList.html',
                    controller: 'createToDoListCtrl'
                })
                .state('login', {
                    url: '/',
                    templateUrl: '/public/views/login.html',
                    controller: 'loginCtrl'
                });

            $urlRouterProvider.otherwise('/');
        }
    ]);


