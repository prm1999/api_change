// Adding the cathing error as per async function
module.exports= fn =>{
    return(req ,res,next) =>{
        fn(req,res,next).catch(next);
    };
};
