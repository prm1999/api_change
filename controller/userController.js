const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync')



exports.getAllUser=catchAsync (async(req,res,next)=>{
    const user=await User.find();
    res.status(500).json({
        status:'success',
        results:user.lengths,

        data:{
            user
        }
    })
})


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

