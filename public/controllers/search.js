app.controller('searchCtrl', function($scope, $http) {

    $scope.result = [];
    $scope.tags = [];

    // get all sensors
    $http.get('/toDoList/getAll')
        .success(function(data) {
            $scope.result = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.search = function() {
        var tag;
        var tagArray = [];
        var tagArrayItem = {};
        for(tag of $scope.tags) {
            tagArrayItem.value = tag;
            tagArray.push(tagArrayItem);
        }
        $http.post('/toDoList/search', tagArray)
            .success(function(data) {
                $scope.tags = [];
                $scope.result = data;
            })
            .error(function(data) {
                console.log(data);
            });
    }

});