app.controller('searchCtrl', function($scope, $http) {

    $scope.result = [];

    // get all sensors
    $http.get('/toDoList/getAll')
        .success(function(data) {
            $scope.result = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});