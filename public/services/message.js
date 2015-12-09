app.factory('notification', ['$mdDialog', function ($mdDialog) {
    return function (title, body) {
        var alert = $mdDialog.alert({
            title: title,
            content: body,
            ok: 'Close'
        });

        return $mdDialog.show(alert);
    };
}]);