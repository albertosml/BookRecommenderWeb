const mongoose = require('mongoose');

const { Schema } = mongoose;

/*const ValorationSchema = new Schema({
    description: { type:String, required:true, trim:true },
    note: { type:Number, required:true },
    datetime: { type:Date, default:Date.now },
    book: { type:Schema.Types.ObjectId, required:true },
    likes: { type:Number, default:0 },
    dislikes: { type:Number, default:0 },
});

const FGSchema = new Schema({ genre: { type:Schema.Types.ObjectId, required:true } });

const UVSchema = new Schema({ useful_valoration: { type:Schema.Types.ObjectId, required:true } });

const RBSchema = new Schema({ 
    reference_book: { type:Schema.Types.ObjectId, required:true },
    valorated: { type:Boolean, default:false } 
});

const RecBSchema = new Schema({ recomended_book: { type:Schema.Types.ObjectId, required:true } });

const PBSchema = new Schema({ pending_book: { type:Schema.Types.ObjectId, required:true } });

const UserSchema = new Schema({
    username: { type:String, required:true, unique:true, trim:true },
    password: { type:String, required:true, trim:true },
    name: { type:String, required:true, trim:true },
    surname: { type:String, required:true, trim:true },
    email: { type:String, required:true, trim:true },
    active: { type:Boolean, default:true }, 
    valorations: [ValorationSchema],
    favourites_genres: [FGSchema],
    useful_valorations: [UVSchema],
    readed_books: [RBSchema],
    recomended_books: [RecBSchema],
    pending_books: [PBSchema]
});
*/

const UserSchema = new Schema({
    username: { type:String, required:true, unique:true, trim:true },
    password: { type:String, required:true, trim:true },
    name: { type:String, required:true, trim:true },
    surname: { type:String, required:true, trim:true },
    email: { type:String, required:true, trim:true },
    active: { type:Boolean, default:true }, 
    valorations: [{
        description: { type:String, required:true, trim:true },
        note: { type:Number, required:true },
        datetime: { type:Date, default:Date.now },
        book: { type:Schema.Types.ObjectId, required:true, ref:'Book' },
        likes: { type:Number, default:0 },
        dislikes: { type:Number, default:0 }
    }],
    favouritesgenres: [
        { genre: { type:Schema.Types.ObjectId, ref:'Favourite Genre' } }
    ],
    useful_valorations: [
        { useful_valoration: { type:Schema.Types.ObjectId, ref:'Useful Valoration' } }
    ],
    readed_books: [
        { readed_book: { type:Schema.Types.ObjectId, ref:'Readed Book' },
          valorated: { type:Boolean, default:false } }
    ],
    recomended_books: [
        { recomended_book: { type:Schema.Types.ObjectId, ref:'Recommended Book' } }
    ],
    pending_books: [
        { pending_book: { type:Schema.Types.ObjectId, ref:'Pending Book' } }
    ]
});
    
module.exports = mongoose.model('User', UserSchema);