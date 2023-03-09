const jwt=require('jsonwebtoken');
const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync')
const AppErrors=require('./../utils/appErrors')

const signToken=id=>{
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    });
}

exports.signup=catchAsync( async(req,res,next)=>{
    // const newUser = await User.create(req.body);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });

    const token=signToken(newUser._id);
    // jwt.sign({ id:newUser._id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRE_IN
    // });
    console.log("XYU")
    res.status(201).json({
        status:'success',
        token:token,
        data:{
            token:token,
            user:newUser
        }
    });
    
});

exports.login=catchAsync (async(req,res,next)=>{
    const {email,password}=req.body;
    
    // check the passowrd and email
    if(!email || !password){
       return  next(new AppErrors('Please provide email and password',400));
    }


        // Check if user exist && passowrd i crorrect
        const  user=await User.findOne({email}).select('+password');
        const correct=await user.correctPassword(password,user.password);

        if(!user||!correct){
            return next(new AppErrors("!Incorrectemail or password",401))
        }
        console.log(user)
        const token=signToken(user._id);
        res.status(200).json({
            status:'success',
            token

        })
    
})