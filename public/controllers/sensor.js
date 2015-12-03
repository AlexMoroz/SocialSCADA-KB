app.controller('sensorCtrl', function($scope, $http, $location, $mdDialog) {

    var sensors = [];
    var places = [];
    $scope.selectedSensors = [];
    $scope.uniquePlaces = [];
    $scope.breadcrumbs = [];
    var add = true;
    var level = 0;


    // get all sensors
    $http.get('/allSensors')
        .success(function(data) {
            sensors = data.sensors;
            $scope.selectedSensors = data.sensors;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // get all places
    $http.get('/allPlaces')
        .success(function(data) {
            places = data.places;
            fillUniquePlaces(level);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    function fillUniquePlaces(level) {
        $scope.uniquePlaces = [];
        for(place of places) {
            add = true;
            for(uniquePlace of $scope.uniquePlaces) {
                if(place.place[level].value == uniquePlace.place[level].value) {
                    add = false;
                    break;
                }
            }
            if(add) {
                $scope.uniquePlaces.push(place.place[level]);
            }
        }
    };

    $scope.listChildrenAndSensors = function(selectedPlace) {
        if(selectedPlace.parent) {
            level = selectedPlace.level + 1;
            $scope.breadcrumbs.push(selectedPlace);
            for(var i = 0; i < $scope.selectedSensors.length; i++) {
                if ($scope.selectedSensors[i].place[selectedPlace.level].value != selectedPlace.value) {
                    $scope.selectedSensors.splice(i, 1);
                }
            }
            ;
            fillUniquePlaces(selectedPlace.level + 1);
        }
    };

    $scope.back = function() {
        if(level > 0) {
            level--;
            $scope.breadcrumbs.splice(-1, 1);
            $scope.selectedSensors = [];
            for(sensor of sensors) {
                add = true;
                for(var i = 0; i < level; i++) {
                    if(sensor.place[i].value != $scope.breadcrumbs[i].value) {
                        add = false;
                        break;
                    }
                }
                if(add) {
                    $scope.selectedSensors.push(sensor);
                }
            }
            fillUniquePlaces(level);
        }
    };

    // create new sensor when form is submitted
    $scope.submit = function() {
        $http.post('/createSensor', $scope.formData)
            .success(function(data) {
                console.log(data);
                $scope.formData = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.showSensorDialog = function (ev) {
        $mdDialog.show({
            controller: $scope.dialogController,
            templateUrl: 'addSensor',
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

app.filter('joinBy', function () {
    return function (input,delimiter) {
        return (input || []).join(delimiter || '>>');
    };
});