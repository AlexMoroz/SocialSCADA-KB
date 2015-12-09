app.controller('homeCtrl', function($scope, UserService) {
    UserService(function(user) {
        $scope.user = user;
    })
});