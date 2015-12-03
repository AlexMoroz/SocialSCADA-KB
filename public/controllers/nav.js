app.controller('navCtrl', function($mdDialog, $location, $scope, $http, MessageService) {

    $scope.name = name;

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    this.showSensorList = function() {
        $location.path('/sensorList');
    };

    this.showAllUsers = function() {
        $location.path('/');
    };

    this.createUser = function() {
        $location.path('/createUser');
    };

    this.showAllToDoListTemplates = function() {
        $location.path('/');
    };

    this.createToDoListTemplate = function() {
        $location.path('/createToDoListTemplates');
    };

    this.logout = function() {
        $http.get('/logout')
            .success(function(data) {
                MessageService.setMessage(data.message);
                $location.path('/login');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});