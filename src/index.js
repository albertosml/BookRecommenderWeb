const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Db connection
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares 
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/', require('./routes/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado');
});
