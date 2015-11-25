app.controller('homeCtrl', function($scope) {
    console.log(name);
    $scope.name = name;
}).controller('loginCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
                if(data.success) {
                    console.log('user ' + data.name + ' successfully logged in');
                    name = data.name
                    $location.path('/home')
                }
                else {
                    console.log('login failed');
                    $location.path('/login')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
});