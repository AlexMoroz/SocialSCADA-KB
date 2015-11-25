'use strict';

var name = '';

/* defining the app */
var app = angular.module('socialscadakb', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/public/partials/login.html',
            controller: 'loginCtrl',
        });
        $routeProvider.when('/home', {
            templateUrl: '/public/partials/home.html',
            controller: 'homeCtrl',
        });
        $routeProvider.otherwise({redirectTo: '/'});
    })

    .controller('loginCtrl', function($scope, $http, $location) {
        $scope.submit = function() {
            $http.post('/login', $scope.formData)
                .success(function(data) {
                    if(data.success) {
                        console.log('user ' + data.name + ' successfully logged in');
                        name = data.name
                        $location.path('/home')
                    }
                    else {
                        console.log('login failed');
                        $location.path('/login')
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    })
    .controller('homeCtrl', function($scope) {
        console.log(name);
        $scope.name = name;
    });
