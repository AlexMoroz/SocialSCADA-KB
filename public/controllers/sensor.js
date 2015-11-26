app.controller('sensorCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http.post('/createSensor', $scope.formData)
            .success(function(data) {
                console.log(data);
                $scope.formData= {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});