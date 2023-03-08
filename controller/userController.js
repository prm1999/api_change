const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync')


exports.signup=catchAsync( async(req,res,next)=>{
    const newUser=await User.create(req.body);
    res.status(201).json({
        status:'success',
        user:{
            user:newUser
        }
    });
})



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

