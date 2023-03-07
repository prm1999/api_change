const AppErrors=require('./../utils/appErrors')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppErrors(message, 400);
  };

  
const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });

}

const sendErrorProd=(err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        });
    
    }
    // programmer doesnt want to leak the logic message to the client
    else{
        console.error('ERROR'.err);
        res.status(500).json({
            status:'error',
            message:'something is wrong'
        })
    }

}

module.exports=(err,req,res,next)=>{
    // Internal server error
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV==='production'){
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error,res);

    }

}

