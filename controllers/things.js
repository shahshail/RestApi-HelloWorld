
var dbConnection;
var ObjectID = require('mongodb').ObjectID;

//Setup database connection
exports.setDBConnectionsFromApp = function(app){
    dbConnection = app.get('dbConnection');
}

exports.findAll = function (req, res){

    //Mongodb collection specified
    var collection  = dbConnection.collection("Things");

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


//=================================== Find by ID ============================================================================
exports.findById = function (req,res){
    var collection = dbConnection.collection("Things");

    //Check for valid object ID
    var objID;
    try{
        objID = ObjectID(req.params.id);
    }catch (e){
        res.status(500);
        res.send({success : false, msh : "Invalid Id"});
        return;
    }

    var items = collection.findOne({"_id" : objID}, function(err, item){
        res.type('application/json');

        if(item != null){
            var newItem = {};
            newItem.id = item._id;
            newItem.name = item.name;
            newItem.location = item.location;

            res.status(200);
            res.json(newItem);
        }
        else{
            console.log("Oops something is wrong..Item not found: " + req.params.id)
            res.status(400);
            res.json({})
        }

    });
}

//=================================== add ============================================================================
exports.add = function(req, res) {
    var item = req.body;
    var newItem = {};
    newItem.name  = req.body.name;
    newItem.location = req.body.locationl
    newItem.timestamp = Date.now()/1000; //Date is in milisecond wee need to use second

    var collection = dbConnection.collection('Things');

    var items = collection.insertOne(newItem, (err, returnItem)=> {
        res.type('application/json');

        if(returnItem != null){ // The data are inserted successfully
            res.status(201); // Success insertion status
            res.json(newItem);
        }else{
            console.log('Insert Failed');
            res.status(400);
            res.json({});
        }
    });

}