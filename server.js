
// This line simply import express dependency to our file..
var express = require('express')

var app = express()

//Port number that we are gonna listning on
//Rather than hardcore the port number we can implement a method to get argument from command line and set the port numbers dynamically..
var program_name = process.argv[0];
var script_path = process.argv[1];
var port_string = process.argv[2];

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

