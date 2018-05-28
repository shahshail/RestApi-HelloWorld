
// This line simply import express dependency to our file..
var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var budyParser = require('body-parser');


var app = express();

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
            mongodbURL = "mongodb://localhost:27017/HelloWorld"
            console.log("environment = " + mongodbURL);
            break;

        default:
            console.log("env_value is not valid: " + env_value);
            return -1;

    }
}


var port_number = "9999"; // tells express to listen this port
if(typeof port_string !== "undefined" && port_string.length > 0){
    console.log("port_string=" + port_string);

    port_number = port_string;
}

app.listen(Number(port_number));
console.log('Server is running....')

app.get('/hello',function(req,res){
    res.type('text/plain');
    res.send('Namaste from Shail: This message is comming from PORT' + port_number);
});


console.log("Hello from Node")

