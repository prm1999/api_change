const jwt=require('jsonwebtoken');
const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync')


exports.signup=catchAsync( async(req,res,next)=>{
    const newUser = await User.create(req.body);

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    //   });

    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    });

    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });
    
});



exports.getAllUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"this is not yet defined"

    })
}


exports.createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"this is not yet defined"

    })
}

exports.updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"this is not yet defined"

    })
}


exports.deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"this is not yet defined"

    })
}

exports.getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"this is not yet defined"

    })
}

