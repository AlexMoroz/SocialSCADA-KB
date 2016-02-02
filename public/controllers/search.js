app.controller('searchCtrl', function($scope, $http) {

    $scope.result = [];
    $scope.tags = [];

    // get all sensors
    $http.get('/ToDoList')
        .success(function(data) {
            $scope.result = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.search = function() {
        if($scope.tags.length == 0) {
            // get all sensors
            $http.get('/ToDoList')
                .success(function(data) {
                    $scope.result = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
        else {
            $http.post('/ToDoList/search', $scope.tags)
                .success(function (data) {
                    $scope.tags = [];
                    $scope.result = data;
                })
                .error(function (data) {
                    console.log(data);
                });
        }
    }

});