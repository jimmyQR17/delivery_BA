const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport= require('passport');
const multer = require('multer');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credentials: admin.credential.cert(serviceAccount)
});

const upload = multer({
storage: multer.memoryStorage()

});


var expressSession = require("express-session");


app.use(expressSession({
    secret: "This is one hell of a secret",
    resave: false,
    saveUninitialized: false
  }));



/*
* RUTAS

*/

const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({

    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);
/*
LLAMANDO A LAS RUTAS
*/
users(app,upload);


server.listen(3000,'192.168.5.45' || 'localhost', function(){ 

 console.log('Aplicacion de NodeJS '+ process.pid+ 'Iniciada ...'+ port)

});

app.get('/', (req, res)=>{
res.send('Ruta raiz del backend');

});


app.get('/test', (req, res)=>{
    res.send('Este es la ruta TEST');
    
    });

//Error handler

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(err.status || 500).send(err.stack);

});
// 200 - ES UNA RESPUESTA EXITOSA
//404 - SIGNIFICA QUE LA URL NO EXISTE
//500 - ERROR INTERNO DEL SERVIDOR

module.exports={

app: app,
server: server

}