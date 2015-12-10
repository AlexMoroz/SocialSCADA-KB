app.controller('loginCtrl', function($scope, $http, $state, notification, UserService) {

    $scope.submit = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
                $state.go('nav.home');
            })
            .error(function(data) {
                notification("Alert", data.message);
            });
    }
});