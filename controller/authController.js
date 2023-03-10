const { promisify }=require('util');
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
    const newUser = await User.create(req.body);

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    //   });

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



exports.protect=catchAsync (async (req,res,next)=>{
    // 1) get the token and check if this there
    let token;
    if(
        req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
    ){
          token=req.headers.authorization.split(' ')[1];      
    }
    // console.log(token);

    if(!token){
        return next(
            new AppErrors("Your are not looged in ! Please log to the access",401)
            );
    }

    // 2)validate the token&verification
   const decoded= await promisify(jwt.verify)(token, process.env.JWT_SECRET) 
    // console.log(decoded)
    // 3) Check if the user is exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppErrors(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
  
    // 4) check if user change the password
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppErrors('User recently changed password! Please log in again.', 401)
        );
      }
    
      // GRANT ACCESS TO PROTECTED ROUTE
      req.user = currentUser;

      
    next()


})


// restrict tio the access
exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        // roles [admin,lead-guide] roles  for user
        if(!roles.includes(req.user.role)){
            return next(new AppErrors('You dont have the permission to do the work',403))            
        }

        next();
    };

}

exports.forgotPassword=catchAsync(async(req,res,next)=>{
    // Get user based on Posted email
    const user=await User.findOne({email:req.body.email});
    if(!User){
        return  next(new AppErrors('There is no user with this email address',404));
    }

    // Generate the random reset token
    const resetToken = user.createPasswordToken();
    // stop all the validator 
        await user.save({validateBeforeSave: false})
    // send it user 

    const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/resetPassword/${resetToken}`;
    
      const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    
      try {
        await sendEmail({
          email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
          message
        });
    
        res.status(200).json({
          status: 'success',
          message: 'Token sent to email!'
        });
      } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
    
        return next(
          new AppError('There was an error sending the email. Try again later!'),
          500
        );
      }
    });

exports.resetPassword=(req,res,next)=>{}