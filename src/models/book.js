const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
    isbn: { type:String, required:true, unique:true, trim:true },
    title: { type:String, required:true, trim:true },
    author: { type:String, required:true, trim:true },
    numpages: { type:Number },
    publicationdate: { type:Date },
    url: { type:String, trim:true },
    publisher: { type:String, trim:true },
    studio: { type:String, trim:true },
    language: { type:String, trim:true },
    genres: [
        { genre: { type:Schema.Types.ObjectId, ref:'Genres' } }
    ],
    type: { type:String }
});
    
module.exports = mongoose.model('Book', BookSchema);