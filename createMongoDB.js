print('Database:')
printjson(db.getName());

// delete non-system collections
print('Deleting...');
db.getCollectionNames().forEach(function(c) { if (c.indexOf("system.") == -1) db[c].drop(); });

// create db and collections
print('... start creating collections.');
db.createCollection("user",{autoIndexId:true});
db.createCollection("todolist_template",{autoIndexId:true});
db.createCollection("todolist",{autoIndexId:true});
db.createCollection("event",{autoIndexId:true});
db.createCollection("sensor",{autoIndexId:true});
db.createCollection("sensor_type",{autoIndexId:true});
db.createCollection("place_type",{autoIndexId:true});
db.createCollection("places",{autoIndexId:true});

print('Collections created:');
printjson(db.getCollectionNames());

// create data

// User
print('insert user data');
db.user.insert({firstname:"Joe",lastname:"Doe",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:true});
db.user.insert({firstname:"Adam",lastname:"God",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:false});
db.user.insert({firstname:"Eve",lastname:"God",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:false});

// ToDoList with ToDo List
print('insert ToDoList data');
db.todolist.insert({_id:1,event_id:1,user_id:2,todos:[
	{_id:1,name:"Call fire brigade",description:"Call 112 and tell them building xyz in street abc is burning",done:true},
	{_id:2,name:"Run",description:"run away and never look back",done:true}]});
db.todolist.insert({_id:2,event_id:2,user_id:3,todos:[
	{_id:1,name:"Check pressure valve",description:"Turn the valve until green arrow appears",done:true},
	{_id:2,name:"Pull lever",description:"Pull right lever",done:false}]});

// ToDoListTemplate with ToDoTemplate List
print('insert ToDoListTemplate data');
db.todolist_template.insert({_id:1,alarm:"fire",sensor_id:1,user_id:2,todos:[
	{_id:1,name:"Call fire brigade",description:"Call 112 and tell them building xyz in street abc is burning"},
	{_id:2,name:"Run",description:"run away and never look back"}]});
db.todolist_template.insert({_id:2,alarm:"high pressure",sensor_id:2,user_id:3,todos:[
	{_id:1,name:"Check pressure valve",description:"Turn the valve until green arrow appears"},
	{_id:2,name:"Pull lever",description:"Pull right lever"}]});

// Event
print('insert event data');
db.event.insert({_id:1,sensor_id:1,value:89.2,alarm_type:"fire"});
db.event.insert({_id:2,sensor_id:2,value:101325,alarm_type:"high pressure"});

// Sensor with Place
print('insert sensor data');
db.sensor.insert({_id:1,type:"temperature",
    place:[
        {type: "city", value: "Munich", child: false, parent: true, level:0},
        {type: "street", value: "teststreet", child: true, parent: true, level:1},
        {type: "street number", value: "123", child: true, parent: true, level:2},
        {type: "floor", value: "1", child: true, parent: true, level:3},
        {type: "room number", value: "01.09.014", child: true, parent: false, level:4}
    ]
});
db.sensor.insert({_id:2,type:"pressure",
    place:[
        {type: "city", value: "Munich", child: false, parent: true, level:0},
        {type: "street", value: "teststreet", child: true, parent: true, level:1},
        {type: "street number", value: "123", child: true, parent: true, level:2},
        {type: "floor", value: "1", child: true, parent: true, level:3},
        {type: "room number", value: "01.09.015", child: true, parent: false, level:4}
    ]
});

// Places
print('insert places data');
db.places.insert({
    _id:1, place:[{type: "city", value: "Munich", child: false, parent: true, level: 0},
        {type: "street", value: "teststreet", child: true, parent: true, level: 1},
        {type: "street number", value: "123", child: true, parent: true, level: 2},
        {type: "floor", value: "1", child: true, parent: true, level: 3},
        {type: "room number", value: "01.09.014", child: true, parent: false, level: 4}]
});
db.places.insert({
    _id: 2, place: [{type: "city", value: "Munich", child: false, parent: true, level: 0},
        {type: "street", value: "teststreet", child: true, parent: true, level: 1},
        {type: "street number", value: "123", child: true, parent: true, level: 2},
        {type: "floor", value: "1", child: true, parent: true, level: 3},
        {type: "room number", value: "01.09.015", child: true, parent: false, level: 4}]
});

// Place types
print('insert place type data');
db.place_type.insert({value: "city"});
db.place_type.insert({value: "street"});
db.place_type.insert({value: "street number"});
db.place_type.insert({value: "floor"});
db.place_type.insert({value: "room number"});

// sensor types
print('insert sensor type data');
db.sensor_type.insert({value: "temperature"});
db.sensor_type.insert({value: "pressure"});
db.sensor_type.insert({value: "humidity"});
db.sensor_type.insert({value: "carbon monoxide"});
db.sensor_type.insert({value: "oxygen"});
db.sensor_type.insert({value: "light"});
