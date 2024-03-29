app.controller('navCtrl', function ($mdDialog, $state, $scope, $http, UserService) {

    UserService(function (user) {
        $scope.user = user;
    });

    var originatorEv;

    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.showSearch = function () {
        $state.go("nav.search");
    };

    $scope.createUser = function () {
        $state.go("nav.createUser");
    };

    $scope.showAllToDoListTemplates = function () {
        $state.go("nav.home");
    };

    $scope.createToDoList = function () {
        $state.go("nav.createToDoList");
    };

    $scope.logout = function () {
        $http.get('/logout')
            .success(function (data) {
                $state.go("login");
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

});