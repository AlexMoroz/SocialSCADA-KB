app.controller('loginCtrl', function($scope, $http, $state, notification) {

    $scope.submit = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
                name = data.name;
                $state.go('nav.home');
            })
            .error(function(data) {
                console.log('Error: ', data);
                notification("Alert", data.message);
            });
    }
});