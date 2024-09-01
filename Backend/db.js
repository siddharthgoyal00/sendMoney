import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://admin:fvmQ1D2B6iDKmUM6@cluster0.ztkcnap.mongodb.net/");
const userSchema = new mongoose.Schema({

    username: {
     type: String,
     required: true,
     unique: true,
     lowerCase: true,
     trim: true,
     minLength: 3,
     maxLength: 8,
    },

    password:{
     type:String,
     required:true,
     minLength:8,
     maxLength:20

    },

    firstName:{ 
        type:String,
        required: true,
        trim:true,
        maxLenght: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength:20
    }

});
/*  simple solution 
const userSchema = new mongoose.Schema({
username : String,
password : String,
firstName : String,
lastName : String
})

*/
const User = mongoose.model('User', userSchema);
module.exports ={
    User
};