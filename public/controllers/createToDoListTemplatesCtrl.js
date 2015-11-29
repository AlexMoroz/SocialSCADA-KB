app.controller('createToDoListTemplatesCtrl', function ($scope, $http, $location, $mdDialog) {

    $scope.toDoListTemplate = new Object();

    this.alarmtypes = ["Fire", "Hot", "Cold"];
    this.sensors = ["Building 1, Room 21", "Building 2, Room 12"];
    this.users = ["John", "Max", "Susan"];

    $scope.toDoListTemplate.alarmtype = "";
    $scope.toDoListTemplate.sensor = "";
    $scope.toDoListTemplate.user = "";
    $scope.toDoListTemplate.toDoTemplates = new Array();
    $scope.newToDo = new Object();

    $scope.submit = function () {
        $http.post('/createToDoListTemplate', $scope.toDoListTemplate)
            .success(function(data) {
                console.log(data);
                $scope.toDoListTemplate= new Object();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: $scope.dialogController,
            templateUrl: 'dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        }).then(function (newToDo) {
            $scope.toDoListTemplate.toDoTemplates.push(new Object({name: newToDo.name, description: newToDo.description}));
        }, function () {
            console.log("cancelled");
        });
    };

    $scope.dialogController = function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.addToDo = function (newToDo) {
            $mdDialog.hide(newToDo);
        }

    }
});

