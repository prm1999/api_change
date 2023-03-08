const jwt=require('jsonwebtoken');
const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync')


exports.signup=catchAsync( async(req,res,next)=>{
    // const newUser = await User.create(req.body);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });

    const token=jwt.sign({ id:newUser._id},"pradeep",{
        expiresIn:process.env.JWT_EXPIRE_IN
    });
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

