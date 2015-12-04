
app.service('UserService', function() {
    var activeUser;
    this.setUser = function(user) {
        activeUser = user;
    }

    this.getUser = function() {
        return activeUser;
    }
});
