var PlaceHierarchyEntry = require('../model/place').PlaceHierarchyEntry,
    Boom = require('boom');

exports.create = {
    handler: function (request, reply) {
        var place = new PlaceHierarchyEntry(request.payload);
        place.save(function (err, place) {
            if (!err) {
                return reply({ message: "place created" });
            }
            if (11000 === err.code || 11001 === err.code) {
                return reply(Boom.forbidden("please provide another place id, it already exist"));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    }
};

exports.getAll = {
    handler: function(request, reply) {
        PlaceHierarchyEntry.find(function(err, places) {
            if(err) {
                return reply({ message: "error" });
            }
            return reply({ places: places});
        })
    }
}