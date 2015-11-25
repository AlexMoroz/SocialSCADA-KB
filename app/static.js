'use strict';

exports.getIndex = {
    handler:
        function(request, reply) {
            reply.file('./public/index.html');
        }
}

exports.getPublicFolder = {
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: false
        }
    }
}
