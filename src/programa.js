// Db connection
const { mongoose } = require('./database');

const User = require('./models/user');
const Book = require('./models/book');

async function obtenLibros() {
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
