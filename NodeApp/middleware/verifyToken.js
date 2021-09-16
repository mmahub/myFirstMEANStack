const jwt = require('jsonwebtoken');    // loading jsonwebtoken


module.exports = function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send(`Unautorized request`);
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send(`Unautorized request`);
    }
    let payload = jwt.verify(token, 'jwtPrivateKey')
    if (!payload) {
        return res.status(401).send(`Unautorized request`); 
    }
    req.userId = payload.subject
    
    next()
}