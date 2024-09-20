const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const db = require('./config/dbConfig');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

//Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

db.connect((err) => {
  if(err){
    console.error('Error al conectar con la base de datos: ', err)
    return;
  }
  console.log('conectado a MySQL')
});


app.use('api/auth', authRoutes);
const portFolioRoutes = require('./api/portfolio');
app.use('/api/portfolio', portFolioRoutes);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});