print('Database:')
printjson(db.getName());

// delete non-system collections
print('Deleting...');
db.getCollectionNames().forEach(function(c) { if (c.indexOf("system.") == -1) db[c].drop(); });

// create db and collections
print('... start creating collections.')
db.createCollection("user",{autoIndexId:true});
db.createCollection("todolist_template",{autoIndexId:true});
db.createCollection("todolist",{autoIndexId:true});
db.createCollection("event",{autoIndexId:true});
db.createCollection("sensor",{autoIndexId:true});

print('Collections created:');
printjson(db.getCollectionNames());

// create data

// User
print('insert user data');
db.user.insert({_id:1,firstname:"Joe",lastname:"Doe",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:true});
db.user.insert({_id:2,firstname:"Adam",lastname:"God",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:false});
db.user.insert({_id:3,firstname:"Eve",lastname:"God",password:"9f735e0df9a1ddc702bf0a1a7b83033f9f7153a00c29de82cedadc9957289b05",admin:false});

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
db.sensor.insert({_id:1,type:"temperature",place:{_id:1,street:"abc",number:42,building:"MI",room:"01.09.114",longitude:48.262647,latitude:11.667892}});
db.sensor.insert({_id:2,type:"pressure",place:{_id:1,street:"abc",number:42,building:"MI",room:"01.09.114",longitude:48.262647,latitude:11.667892}});