
var dbConnection;
var ObjectID = require('mongodb').ObjectID;

//Setup database connection
exports.setDBConnectionsFromApp = function(app){
    dbConnection = app.get('dbConnection');
}

exports.findAll = function (req, res){

    //Mongodb collection specified
    var collection  = dbCollection.collection("Things");

    /**
     * collection.find() ,ethod has two parameters : query, projection
     * query : Optional, Specifies selection filter useng query operators. to return all documents in collection pass empty ({}) document.
     * projection : Optional Specifies the field to return document that mathc the query filter.
     * 
     * In this findAll method we are going to find all the items from the mongodb database
     */
    var items = collection.find({},function(err, docCursor){ // callback function for Non-Blocking tasks
        res.type('application/json'); // our response type 
        if(err){
            res.status(500); // 500 Response if anything goes wrong..
            res.send({success:false, msg : "Database error"});
            return;
        }

        // If we dont get an error then we will preceed further..
        var itemList = []; // List for storing all the data
        docCursor.each(function(err,item) { //Iterate the ducument (NOTE : all the data we are receive from mongobd will be in JSON-Document format)
            if(item != null){
                var newItem = {};
                newItem.id = item._id;
                newItem.name = item.name;
                newItem.location = item.location;

                itemList.push(item); //Insert Current item into ItemList
            }else{
                res.status(200); //Success Code - 200
                res.json({item  : itemList}) // Returns data in JSON format..Simple right :)
            }
        });

    });
}