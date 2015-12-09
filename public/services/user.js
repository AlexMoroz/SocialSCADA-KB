
app.service('UserService', function($http) {
    return function(callback) {
        $http({
            method: 'GET',
            url: '/user/getActiveUser',
            withCredentials: true
        }).then(function success(response) {
            return callback(response.data);
        }, function error(response) {
            console.log("Error: ", response.statusText);
        });
    }
});
