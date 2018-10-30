const express = require('express');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT);

// Middlewares 
app.use(morgan('dev'));
app.use(express.json());

// Routes


// Static files

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado');
});
