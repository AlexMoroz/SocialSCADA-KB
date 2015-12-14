app.controller('createToDoListCtrl', function ($scope, $http, $location, $mdDialog, notification) {

    $scope.toDoList = new Object();
    $scope.parameters = [];

    $scope.toDoList.tags = new Array();
    $scope.toDoList.todos = new Array();
    $scope.newToDo = new Object();

    $scope.addParam = function (key, value) {
        if (key == "" || value == "" || key == undefined || value == undefined) {
            notification("Alert", "Empty fields are not allowed.");
            return;
        }
        $scope.paramName = "";
        $scope.paramValue = "";
        var param = {
            "key": key,
            "value": value,
            "edit": false
        };
        $scope.parameters.push(param);
    };

    $scope.saveParam = function (key, value) {
        if (key == "" || value == "" || key == undefined || value == undefined) {
            notification("Alert", "Empty fields are not allowed.");
            return;
        }
        $scope.parameters[find($scope.parameters, key)].value = value;
    };

    function find(array, key) {
        for (item in array) {
            if (array[item].key == key) {
                return item;
            }
        }
    }

    $scope.submit = function () {
        //add parameters to toDoList
        $scope.toDoList.params = $scope.parameters;
        console.log($scope.toDoList);
        $http.post('/createToDoList', $scope.toDoList)
            .success(function (data) {
                console.log(data);
                $scope.toDoList = new Object();
                $scope.toDoList.tags = new Array();
                $scope.toDoList.todos = new Array();
                $scope.newToDo = new Object();
                notification("Message", "Successfully saved.");
            })
            .error(function (data) {
                notification("Message", "Error while saving.");
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

    };

});

