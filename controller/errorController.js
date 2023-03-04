module.exports=(err,req,res,next)=>{
    // Internal server error
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';


    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
}

