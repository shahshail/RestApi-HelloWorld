
// This line simply import express dependency to our file..
var express = require('express')

var app = express()

//Port number that we are gonna listning on
var port_number = "9999"; // tells express to listen this port

app.listen(Number(port_number));
console.log('Server is running....')

app.get('/hello',function(req,res){
    res.type('text/plain');
    res.send('Namaste from Shail: This message is comming from PORT' + port_number);
});


console.log("Hello from Node")

