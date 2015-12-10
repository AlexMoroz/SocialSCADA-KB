app.controller('createToDoListCtrl', function ($scope, $http, $location, $mdDialog) {

    $scope.toDoList = new Object();

    this.alarmtypes = ["Fire", "Hot", "Cold"];
    this.sensors = ["Sensor 1", "Sensor 2"];
    this.users = ["John", "Max", "Susan"];

    $scope.alarmtype = "";
    $scope.sensor = "";
    $scope.user = "";
    $scope.toDoList.tags = new Array();
    $scope.toDoList.todos = new Array();
    $scope.newToDo = new Object();

    $scope.submit = function () {

        $scope.toDoList.tags.push($scope.alarmtype);
        $scope.toDoList.tags.push($scope.sensor);
        $scope.toDoList.tags.push($scope.user);

        $http.post('/createToDoList', $scope.toDoList)
            .success(function(data) {
                console.log(data);
                document.getElementById("errorMessage").style.display = "none";
                document.getElementById("successMessage").style.display = "block";
                $scope.toDoList= new Object();
                $scope.alarmtype = "";
                $scope.sensor = "";
                $scope.user = "";
                $scope.toDoList.tags = new Array();
                $scope.toDoList.todos = new Array();
                $scope.newToDo = new Object();
            })
            .error(function(data) {
                document.getElementById("errorMessage").style.display = "block";
                document.getElementById("successMessage").style.display = "none";
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
            $scope.toDoList.todos.push(new Object({name: newToDo.name, description: newToDo.description}));
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

