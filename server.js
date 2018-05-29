
// This line simply import express dependency to our file..
var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//We need to tell express to use a body parser to read data for POST,UPDATE and DELETE method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Database Connection Information
var db;
var mongodbURL;

//Port number that we are gonna listning on
//Rather than hardcore the port number we can implement a method to get argument from command line and set the port numbers dynamically..
//This will be important if you trying to run multiple server in single machine
var program_name = process.argv[0];
var script_path = process.argv[1];
var port_string = process.argv[2];
var env_value = process.argv[3];


if(env_value === "undefined"){
    console.log("env_value is not set..");
    return -1;
} else {
    switch(env_value){
        case "DEV" : 
            mongodbURL = "mongodb://localhost:27017/HelloWorld";
            console.log("environment = " + mongodbURL);
            break;

        default:
            console.log("env_value is not valid: " + env_value);
            return -1;

    }
}

app.set('public', path.join(__dirname, 'public'));

console.log(__dirname);
console.log(__filename);
console.log(app.get('public'));

//Set public mappinf - index.html
app.use(express.static(app.get('public')));

var port_number = "9999"; // tells express to listen this port
if(typeof port_string !== "undefined" && port_string.length > 0){
    console.log("port_string=" + port_string);

    port_number = port_string;
}

console.log("Hello from Node")

MongoClient.connect(mongodbURL, function(err, dbConnection){
    assert.equal(null,err);
    console.log("connected successfully to mongodb Server : " + mongodbURL);
    db = dbConnection;
    app.set("dbConnection",dbConnection);

    require('./routes/things')(app);

    // Set mapping for file not found error
    app.use(function(req, res, next) {
        res.status(404);
        res.sendFile(path.join(__dirname,'./public', '404.html'));
    }); 

    //Handle stack trace errors
    app.use(function(err, req, res, next) {

        console.error(err.stack);
        res.status(500);
        res.sendFile(path.join(__dirname,'./public', '500.html'));
    });

    //after database is connected and ready the we are gonna start listning..(that kind of make sense)
    app.listen(Number(port_number));
    console.log('Server is running....')
});
