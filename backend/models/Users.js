import mongoose from 'mongoose';
const { Schema } = mongoose;

const usersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:date,
        default:Date.now
    }
});

module.exports = mongoose.model('user',usersSchema);