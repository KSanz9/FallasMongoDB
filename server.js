const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./config/database.config');
let port = process.env.PORT;

if(port ==null || port ==""){
    port = 3000;
}

// Utilizaremos body-parser para "parsear lo que nos pidan"
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Conectando en si mismo
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true}).then(()=>{
        console.log(" * Cargada y preparada en 2020 por kevin");
    }).catch(err => {
        console.log(" Algo ha pasado...saliendo : ",err);
        process.exit();
    });




// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Require Puntuaciones routes
require('./app/routes/puntuaciones.routes.js')(app);

// Escuchemos en un puerto
app.listen(port,() => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});

