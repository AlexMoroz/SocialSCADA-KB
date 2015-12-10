print('Database:');
db = db.getSiblingDB("socialscada");
printjson(db.getName());


// delete non-system collections
print('Deleting...');
db.getCollectionNames().forEach(function(c) { if (c.indexOf("system.") == -1) db[c].drop(); });

// create db and collections
print('... start creating collections.');
db.createCollection("user", {autoIndexId:true});
db.createCollection("todolist", {autoIndexId:true});
db.createCollection("tag", {autoIndexId: true});

print('Collections created:');
printjson(db.getCollectionNames());

// create data

// User
print('insert user data');
db.user.insert({email: "joedoe@tum.de", firstname:"Joe",lastname:"Doe",password:"password", admin:true});
db.user.insert({email: "adamgod@tum.de", firstname:"Adam",lastname:"God",password:"$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm",admin:false});
db.user.insert({email: "evegod@tum.de", firstname:"Eve",lastname:"God",password:"$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm",admin:false});

// ToDoList with ToDoList
print('insert ToDoList data');
db.todolist.insert({
	tags:["Joe Doe","fire","room 1"],
	todos:[{name:"Call fire brigade",description:"Call 112 and tell them building xyz in street abc is burning"},
		{name:"Run",description:"run away and never look back"}]
});
db.todolist.insert({
	tags:["Adam God","high pressure","room 2"],
	todos:[{name:"Check pressure valve",description:"Turn the valve until green arrow appears"},
		{name:"Pull lever",description:"Pull right lever"}]
});

// tags
print('insert tags data');
db.tag.insert({name:"scada"});
db.tag.insert({name:"social"});