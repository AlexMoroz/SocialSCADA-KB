var Sensor = require('../model/sensor').Sensor,
    Boom = require('boom');

exports.create = {
    handler: function (request, reply) {
        var sensor = new Sensor(request.payload);
        sensor.save(function (err, sensor) {
            if (!err) {
                return reply({ message: "sensor created" });
            }
            if (11000 === err.code || 11001 === err.code) {
                return reply(Boom.forbidden("please provide another sensor id, it already exist"));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    }
};

exports.getAll = {
    handler: function(request, reply) {
        Sensor.find(function(err, sensors) {
            if(err) {
                return reply({ message: "error" });
            }
            return reply({ sensors: sensors });
        })
    }
}