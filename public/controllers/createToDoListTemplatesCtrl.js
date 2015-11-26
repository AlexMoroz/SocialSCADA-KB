app.controller('createToDoListTemplatesCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http.post('/createToDoListTemplatesCtrl', $scope.formData)
            .success(function(data) {
                if(data.success) {
                    console.log('succesfully saved');
                    name = data.name
                    $location.path('/manageToDoListTemplates')
                }
                else {
                    console.log('error');
                    $location.path('/manageToDoListTemplates')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});