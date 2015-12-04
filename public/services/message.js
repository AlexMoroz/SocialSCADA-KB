app.service('MessageService', function() {
    var displayMessage;
    this.setMessage = function(message) {
        displayMessage = message;
    }

    this.getMessage = function() {
        return displayMessage;
    }
});