
var dbConnection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function(app){
    dbConnection = app.get('dbConnection');
}