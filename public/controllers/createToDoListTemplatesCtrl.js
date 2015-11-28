app.controller('createToDoListTemplatesCtrl', function($scope, $http, $location, $mdDialog, $mdMedia) {
    $scope.submit = function() {
        $http.post('/createToDoListTemplatesCtrl', $scope.formData)
            .success(function(data) {
                if(data.success) {
                    console.log('succesfully saved');
                    name = data.name
                    $location.path('/manageToDoListTemplates')
                }
                else {
                    console.log('error');
                    $location.path('/manageToDoListTemplates')
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('sm');
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false
            });
        $scope.$watch(function() {
            return $mdMedia('sm');
        }, function(sm) {
            $scope.customFullscreen = (sm === true);
        });
    };

    this.toDoListTemplate = new Object();


    this.alarmtypes = [ "Fire", "Hot", "Cold" ];
    this.sensors = [ "Building 1, Room 21", "Building 2, Room 12" ];

    this.toDoListTemplate.alarmtype = "";
    this.toDoListTemplate.sensor = "";
    this.toDoTemplates = []

});

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}