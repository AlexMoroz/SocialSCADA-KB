print('Database:')
printjson(db.getName());

// delete non-system collections
print('Deleting...');
db.getCollectionNames().forEach(function(c) { if (c.indexOf("system.") == -1) db[c].drop(); });

// create db and collections
print('... start creating collections.');
db.createCollection("user",{autoIndexId:true});
db.createCollection("todolist",{autoIndexId:true});

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
db.todolist.insert({
	tags:[{value:"Joe Doe"},
		{value:"fire"},
		{value:"room 1"}
	],
	todos:[{name:"Call fire brigade",description:"Call 112 and tell them building xyz in street abc is burning"},
		{name:"Run",description:"run away and never look back"}]
});
db.todolist.insert({
	tags:[{value:"Adam God"},
		{value:"high pressure"},
		{value:"room 2"}
	],
	todos:[{name:"Check pressure valve",description:"Turn the valve until green arrow appears"},
		{name:"Pull lever",description:"Pull right lever"}]
});
