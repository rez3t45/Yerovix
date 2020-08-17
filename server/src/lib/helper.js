const jwt = require('jsonwebtoken');


const config = {
	llave : "miclaveultrasecreta123*"
};

// 1
const llave = config.llave;
 

module.exports = {

    rutasProtegidas(req, res, next){

        var token = req.headers.authorization;
        //var token = req.headers['access-token'];

        /*
        console.log(req.headers);
        console.log(token);
        */
        
        if (token) {

        token = token.replace('Bearer ', '')

        jwt.verify(token, llave , (err, decoded) => {      
            if (err) {
            return res.json({ mensaje: 'Token inválida' });    
            } else {
            req.decoded = decoded;    
            next();
            }
        });
        } else {
            res.status(401).send({ error: "Es necesario el token de autenticación" });
        }
    }

};