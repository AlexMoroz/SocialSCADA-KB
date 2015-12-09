app.controller('navCtrl', function ($mdDialog, $state, $scope, $http, notification) {

    $scope.name = name;

    var originatorEv;

    this.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    this.showSearch = function () {
        $state.go("nav.search");
    };

    this.showAllUsers = function () {
        $state.go("nav.home");
    };

    this.createUser = function () {
        $state.go("nav.createUser");
    };

    this.showAllToDoListTemplates = function () {
        $state.go("nav.home");
    };

    this.createToDoList = function () {
        $state.go("nav.createToDoList");
    };

    this.logout = function () {
        $http.get('/logout')
            .success(function (data) {
                $location.path('/login');
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

});