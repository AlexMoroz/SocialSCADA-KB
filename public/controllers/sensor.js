app.controller('sensorCtrl', function($scope, $http, $location) {

    // get all sensors
    $http.get('/allSensors')
        .success(function(data) {
            $scope.sensors = data.sensors;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // create new sensor when form is submitted
    $scope.submit = function() {
        $http.post('/createSensor', $scope.formData)
            .success(function(data) {
                console.log(data);
                $scope.formData = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});