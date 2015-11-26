app.controller('manageToDoListTemplatesCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
                if(data.success) {
                    console.log('succesfully saved');
                    name = data.name
                    $location.path('/home')
                }
                else {
                    console.log('error');
                    $location.path('/login')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});