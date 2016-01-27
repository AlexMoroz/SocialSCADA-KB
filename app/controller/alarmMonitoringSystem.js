'use strict';

var mqtt    = require('mqtt');
//var client  = mqtt.connect('mqtt://broker.hivemq.com',  '[{ port: 1883 }]');
var client  = mqtt.connect('mqtt://test.mosquitto.org/',  '[{ port: 1883 }]');

exports.alarmPanel = {
    handler: function (request, reply) {
        reply.file('./public/views/alarmPanel.html');
    }
};

exports.triggerAlarm = {
    handler: function (request, reply) {

        var alarm = request.payload;
        var alarmString = JSON.stringify(alarm);

        client.publish('SocialSCADA-Alarm', alarmString);
        reply(request.payload);
    }
};