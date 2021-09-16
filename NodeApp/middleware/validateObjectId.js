// This is to validate the ID that is sended in request is valid or not 

const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(404).send('Invalid ID');
    }
    
    next();
}