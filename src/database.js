const mongoose = require('mongoose');

//const URI = 'mongodb://bookrecommender0:QdYJDYCcUe_9@ds127115.mlab.com:27115/bookrecommender'
const URI = 'mongodb://localhost/BookRecommender';

mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(db => console.log('Base de datos conectada'))
  .catch(error => console.error(error));

module.exports = mongoose;