app.controller('userCtrl', function ($scope, $http) {
    $scope.user = {
        email: '',
        password: '' + (Math.random() * 10000000000),
        firstname: '',
        lastname: '',
        company: '',
        address: '',
        admin: false,
        city: '',
        postalCode: ''
    };
    $scope.create = function () {
        $scope.user.username = $scope.user.firstName + ' ' + $scope.user.lastname;
        $http({
            method: 'POST',
            url: '/user/create',
            data: $scope.user
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }
}).controller('viewUserCtrl', function ($scope, $http, $stateParams) {

    $http({
        method: "GET",
        url: "/user/get/" + $stateParams.id
    }).then(function successCallback(response) {
        console.log(response);
        $scope.user = response;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
}).controller('updateUserCtrl', function ($scope, $http) {

    $scope.user = {
        username: '',
        firstname: '',
        lastname: '',
        company: '',
        address: '',
        city: '',
        postalCode: ''
    };
    $scope.create = function () {
        $scope.user.username = $scope.user.firstName + ' ' + $scope.user.lastname;
        $http({
            method: 'POST',
            url: '/user/create',
            data: $scope.user
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }
});