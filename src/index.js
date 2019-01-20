const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const session = require('express-session');
const fileUpload = require('express-fileupload');

// Db connection
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret: 'BookRecommenderDoneByalbertosml',
    resave: false,
    saveUninitialized: false
}));
app.use(fileUpload());

// Routes
app.use('/', require('./routes/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado');
});
