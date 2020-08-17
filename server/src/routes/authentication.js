const express = require('express');
const router = express.Router();

const {} = require('../lib/jw_token');


/*************************************************** */
//****************** JWT *************************** */


const jwt = require('jsonwebtoken');

const config = {
	llave : "miclaveultrasecreta123*"
};

// 1
const llave = config.llave;

const { rutasProtegidas } = require('../lib/helper'); 


router.post('/login',(req,res,next) => {

    if(req.body.usu === "holamundo" && req.body.pwd === "holamundo") {

		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, llave, {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    }
     else {
        res.status(401).send({ error: "usuario o contraseña inválidos" });
    }     

});

router.get('/datos', rutasProtegidas, (req, res) => {
	const datos = [
		{ id: 1, nombre: "Asfo" },
		{ id: 2, nombre: "Denisse" },
		{ id: 3, nombre: "Carlos" }
	];
	
	res.json(datos);
});



module.exports = router;