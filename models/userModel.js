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
        validate:{
            validator:function(el){
                // this only work as save
                return el===this.password;
            },
            message:"Password are not a same"
        }
        
        
    }
})
// preschema on Save

UserSchema.pre('save',function(next){
    // if password is not modified
    if (this.isModified('password')) return next();
    // b script use for the encrpyt 


})
// for creating the user Schema
const User=mongoose.model("user",UserSchema);


module.exports=User;