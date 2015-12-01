app.controller('loginCtrl', function($scope, $http, $location, MessageService) {

    $scope.message = MessageService.getMessage();

    $scope.submit = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
                if(data.success) {
                    console.log('user ' + data.name + ' successfully logged in');
                    name = data.name;
                    $location.path('/home')
                }
                else {
                    console.log('login failed');
                    $scope.message = data.message;
                    $location.path('/login')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});