
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
     */
    var items = collection.find({},function(err, docCursor){
        res.type('application/json');
        if(err){
            res.status(500);
            res.send({success:false, msg : "Database error"});
            return;
        }

        var itemList = [];
        docCursor.each(function(err,item) {
            if(item != null){
                var newItem = {};
                newItem.id = item._id;
                newItem.name = item.name;
                newItem.location = item.location;

                itemList.push(item); //Insert Current item into ItemList
            }else{
                res.status(200);
                res.json({item  : itemList})
            }
        });

    });
}