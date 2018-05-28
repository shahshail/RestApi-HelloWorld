module.exports = function(app) {
    var thingsController = require('../controllers/things')

    app.get('/servies/v1/things', thingsController.findAll);
    app.get('/servies/v1/things/:id', thingsController.findById);
    //app.post('/servies/v1/things', thingsController.add);
    //app.put('/servies/v1/things/:id', thingsController.update);
    //app.delete('/servies/v1/things/:id', thingsController.delete);
    
    thingsController.setDBConnectionsFromApp(app);
}