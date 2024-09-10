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
     maxLength: 30,
    },

    password:{
     type:String,
     required:true,
     minLength:6,
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
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
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
const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User', userSchema);
export { User, Account };
