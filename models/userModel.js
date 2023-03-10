const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

// Create the schema for the user

const userSchema= new mongoose.Schema({
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
        select:false
        // select false will not allow to show the password to all

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
        },        
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})
// preschema on Save

userSchema.pre('save',async function(next){
    // Only run this function if password was actually modified
    // if password is not modified
    if (!this.isModified('password')) return next();
    // b script use for the encrpyt 
    // Hash the password with cost of 12
    this.password=await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm  field
    this.passwordConfirm=undefined;

    next();



})
// for decryping and comparing  the password
userSchema.methods.correctPassword=async function(candidatePassword,UserPassword){
    return await bcrypt.compare(candidatePassword,UserPassword);

}


userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  
  
// for creating the user Schema
const User=mongoose.model("users",userSchema);


module.exports=User;