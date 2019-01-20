const mongoose = require('mongoose');

const { Schema } = mongoose;

const ValorationSchema = new Schema({
    description: { type:String, required:true },
    note: { type:Number, required:true },
    datetime: { type:Date, default:Date.now },
    book: { type:Schema.Types.ObjectId, required:true, ref:'Book' },
    user: { type:Schema.Types.ObjectId, required:true, ref:'User' },
    likes: { type:Number, default:0 },
    dislikes: { type:Number, default:0 }
});
    
module.exports = mongoose.model('Valoration', ValorationSchema);