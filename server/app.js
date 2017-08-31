/**
 * Server side code.
 */
console.log("Starting...");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);
console.log(__dirname + "/../client/");
const NODE_PORT = process.env.NODE_PORT || 3000;
var y = 0;

app.use(express.static(__dirname + "/../client/"));
/*
app.use('/bower_components', express.static(__dirname +
    "/../client/bower_components"));*/

if (!NODE_PORT) {
    console.log("Express Port is not set");
    process.exit();
}

function sum(x, z) {
    var y = x + z;
    return y;
}



app.get("/students", function(req, res) {
    console.log("students");
    var person1 = {
        name: "Kenneth",
        age: 35
    };
    var person2 = {
        name: "Alvin",
        age: 40
    };
    var users = [person1, person2, person1, person1];
    res.send("My name is " + JSON.stringify(users[0]));
});

app.get("/users", function(req, res) {
    console.log("users");
    var person1 = {
        name: "Kenneth",
        age: 35
    };
    var person2 = {
        name: "Alvin",
        age: 40
    };
    var users = [person1, person2, person1, person1];
    res.json(users);
});

app.post("/users", function(req, res) {
    console.log("Received user obejct " + req.body);
    console.log("Received user obejct " + JSON.stringify(req.body));
    var user = req.body;
    user.email = "hi " + user.email;
    console.log("email > " + user.email);
    console.log("password > " + user.password);
    res.status(200).json(user);
});

app.use(function(req, res, next) {
    y = 20 / 5;
    //res.send("<h1>Before the wrong door ! " + y + "</h1>");
    next();
});

app.use(function(req, res, next) {
    console.log(" sorry wrong door -> ");
    var x = sum(1, y);
    //res.send("<h1>Sorry wrong door ! " + x + "</h1>");
    next();
});

app.use(function(req, res) {
    console.log(" sorry wrong door -> ");
    var x = sum(1, y);
    res.send("<h1>!!!! Page not found ! ! " + x + "</h1>");
});

app.listen(NODE_PORT, function() {
    console.log("Web App started at " + NODE_PORT);
});