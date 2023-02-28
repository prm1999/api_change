const mongoose=require('mongoose');
const validator=require('validator');

// Create the schema for the user

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please tell us your name"]


    },

    email:{
        type:String,
        require:[true,"please provide your valid email"],
        unique:true,
        lowercase:true,
        validator:[validator.isEmail, "Please provide valid email"]

    },
    photo:String,
    password:{
        type:String,
        require:[true,"please provide a passowrd"],
        minlength:8,

    },
    passwordConfirm:{
        type:String,
        require:[true,"please confirm a passowrd"],
        
    }
})
// for creating the user Schema
const User=mongoose.model("user",UserSchema);


module.exports=User;