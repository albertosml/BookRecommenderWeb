// Db connection
const { mongoose } = require('./database');

const User = require('./models/user');
const Book = require('./models/book');
const Valoration = require('./models/valoration');

const Jstat = require('jstat');

var ar1 = [5,5,5,5,5,5,5,5,5,5,5,5,5];
var ar2 = [5,4,5,5,4,5,5,5,5,5,4,5,5];

/*ar1 = [5];
ar2 = [223];*/

var ar3 = [];

// Medida coseno
for(let i in ar1) ar3[i] = ar1[i] * ar2[i];
console.log(ar3);
console.log(Jstat.sum(ar3) / ( Math.sqrt( Jstat.sum( Jstat(ar1).pow(2) [0] ) ) * Math.sqrt( Jstat.sum( Jstat(ar2).pow(2) [0] ) ) ) );

// Distancia euclidea
var d = 0;
for(let i in ar1) d += Math.pow((ar1[i] - ar2[i]), 2);
console.log(Math.sqrt(d));

// Correlacion Pearson
console.log(ar1);
console.log(ar2);
console.log(Jstat.corrcoeff(ar1,ar2));

/*async function obtenLibros() {
    var books = await Book.find();
    var array = [];
    for(let i in books) {
        array.push(books[i]._id);
    }
    return array;
}
 
async function obtainUsernames() {
    var users = await User.aggregate([{ $sample: {size: 3} }]);
    return users;
}

async function saveUserBook(user_id, book_id) {
    let u = await User.findById(user_id);
    let user = await User.findOne({ username: u.username, readed_books: {$elemMatch: {_id: book_id}} });
    if(user == null) {
        user = await User.findOne({ username: u.username, recomended_books: {$elemMatch: {_id: book_id}} });
        if(user == null) {
            user = await User.findOne({ username: u.username, pending_books: {$elemMatch: {_id: book_id}} });
            if(user == null) {
                await u.recomended_books.push(book_id);
                await u.save();
            }
            else console.log("libro pendiente");
        }
        else console.log("libro recomendado");
    }
    else console.log("libro leido");
}

obtenLibros()
    .then(books => {
        for(let i in books) {
            obtainUsernames()
                .then(users => {
                    for(let j in users) {
                        console.log(users[j].username);
                        if(users[j].username != "admin") saveUserBook(users[j]._id, books[i]._id);
                    }
                });   
        }
    });
*/