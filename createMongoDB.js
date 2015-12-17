print('Database:');
db = db.getSiblingDB("socialscada");
printjson(db.getName());


// delete non-system collections
print('Deleting...');
db.getCollectionNames().forEach(function (c) {
    if (c.indexOf("system.") == -1) db[c].drop();
});

// create db and collections
print('... start creating collections.');
db.createCollection("user", {autoIndexId: true});
db.createCollection("todolist", {autoIndexId: true});
db.createCollection("tag", {autoIndexId: true});

print('Collections created:');
printjson(db.getCollectionNames());

// create data

// User
print('insert user data'); // the password is "secret"
db.user.insert({
    email: "oleksii.moroz@tum.de",
    firstname: "Oleksii",
    lastname: "Moroz",
    password: "$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm",
    admin: true
});
db.user.insert({
    email: "adamgod@tum.de",
    firstname: "Adam",
    lastname: "God",
    password: "$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm",
    admin: false
});
db.user.insert({
    email: "evegod@tum.de",
    firstname: "Eve",
    lastname: "God",
    password: "$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm",
    admin: false
});

// ToDoList with ToDoList
print('insert ToDoList data');
db.todolist.insert({
    name: "How to Study For Exams",
    tags: ["study", "exams"],
    todos: [
        {name: "Review your syllabus", description: "Figure out when all of your exams will be and how much of your grade they are worth."},
        {name: "Pay attention in class", description: "This seems like a no-brainer, but actually paying attention while you're in class will help you immensely once exam time comes. "},
        {name: "Take good notes", description: "This is easier said than done, but learning how to take good notes will help you immensely once it comes time to study. Write down everything your teacher writes on the board or puts up in slides."},
        {name: "Make studying a part of your habits", description: "Too often, it's easy to view studying as something that only gets done at the last minute in a huge overnight cram session. Instead, try setting aside some time every day to study. "},
        {name: "Ask about the exam format", description: "Ask your teacher what format the test will be in, how it will be graded, if there are any opportunities for extra credit, and if they would be willing to talk to you about highlighting in your notes  what the most important broad subjects will be."}
    ]
});
db.todolist.insert({
    name: "How to Develop Software",
    tags: ["develop", "software", "programming"],
    todos: [
        {name: "Determine which basic type of software development interests you", description: "There are two basic camps of software development: Applications Development and Systems Development."},
        {name: "Teach yourself a programming language", description: "Anyone can come up with ideas, but a developer will be able to turn those ideas into something tangible."},
        {name: "Find resources to help you learn", description: "Most bookstores have entire sections dedicated to programming books, and there are tons available on Amazon and other e-tailers."},
        {name: "Take some classes", description: "While you don't need a full-on degree in order to get into software development, it can't hurt to take a few classes at your local community college or learning center. "},
        {name: "Work on pet projects", description: "Before you start trying to apply your new programming skills to real-world jobs, work on some projects for yourself."}
    ]
});

// tags
print('insert tags data');
db.tag.insert({name: "scada"});
db.tag.insert({name: "social"});