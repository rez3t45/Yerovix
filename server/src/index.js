const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const { execArgv } = require('process');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');

//Iniziar 
const app = express();
require('./lib/passport'); // inizialimaos

//----------------------------------------------
//--Settings Configuraciones
//----------------------------------------------
app.set('port', process.env.PORT || 4000); //-> TOma el puerto del sistema si no tomara el 4000


//----------------------------------------------
// Middlewares
//----------------------------------------------
const {database} = require('./database/keys'); // Instancio objeto database donde se almacenan los datos de acceso a la Base de datos
const passport = require('passport');

app.use(session({
    secret: 'ThisMySecretPXD',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}))

app.use(morgan('dev')); //-> Permite ver resultados x consola

app.use(express.json());
app.use(passport.initialize());//Para el Login
app.use(passport.session());//passport need a session

//----------------------------------------------
//Global Variables
//----------------------------------------------
app.use((req,res,next) => { //- Permitira el uso de Variables

    app.locals.Ses_usu = req.user;
    app.locals.Rforms = req.Rforms;

    next();
})

//----------------------------------------------
// Rutas
//----------------------------------------------


app.use(require('./routes/authentication')); 

//app.use(require('./routes')); //-> automaticamente ejecutara el index.js de esa carpeta 

//app.use(require('./routes/authentication')); 

/*
app.use('/SysTraDoc',require('./routes/SysTraDoc')); //*HERE***********
app.use('/Mantenimiento',require('./routes/Manto_Tablas')); 
*/

//----------------------------------------------
// Starting the server
//----------------------------------------------
app.listen(app.get('port'), () => {
    console.log('servidor en el port', app.get('port'))
} );

