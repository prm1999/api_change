// importing file system
// const fs=require('fs');

// importing data from the model
const Tour=require('./../models/tourModel');



// middleware




// for get api
exports.getAllTours=async (req,res)=>{

    try{
        // BUILD QUERY
        const queryObj={...req.query};
        const excludeFiled=['page','sort','limit','fields'];
        excludeFiled.forEach(ele=>delete queryObj[ele]);

        // // Advance filtering
        // let  queryStr=JSON.stringify(queryObj);
        // // console.log
        // querystr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$ ${match}`);
        // console.log(JSON.parse(querystr));

        let queryStr = JSON.stringify(queryObj);
 
        queryStr = queryStr.replace(/\b(gte|te|lte|lt)\b/g, (match) => `$${match}`);
         
        console.log(JSON.parse(queryStr));


            // find is use for the find all the document

            // filter
    // const tours=await Tour.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy');

    // console.log(req.query)

    // I had the same issue and mine got fixed by replacing the const query = Tour.find(queryObj);  to const query = Tour.find(JSON.parse(queryStr)); just continue following the video.


    const query= Tour.find(JSON.parse(queryStr));

// EXECUATE QUERY
const tours=await query;
    // console.log(req.requestTime);
// SEND RESPONSE
    res.status(200).json({

        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })

    }catch(err){
        res.status(200).json({
            status:'fail',
            message:err
        })
    }
    

}


// for get api on the basis of the id
exports.getTour=async (req,res)=>{

    try{
        // find by id is use by find using the id
        const tours=await Tour.findById(req.params.id)
        // console.log(req.params.id)
        // Tour.findOne({__id:req.param.id})
        res.status(200).json({

            status:'success',
            results:tours.length,
            data:{
                tours
            }
        })
    }catch(err){
        res.status(200).json({
            status:'fail',
            message:err
        })
    }


}



// for post api
exports.createTour=async (req,res)=>{
    try{

            // const newTour=new Tour({});
    //  Tour.save()
    // Instead of new tour and then save we require the save the tour
   const newTour=await  Tour.create(req.body);

   res.status(201).json({
       status:'success',
       data:{
           tour:newTour
       }
   });

    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }


}


exports.updateTour=async(req,res)=>{

    try{
        const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:'success',
            data:{
                tour:tour
            }
        })
    

    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }


}



exports.deleteTour=async(req,res)=>{

    try{
        const tour= await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:'success',
            data:null
        })
        

    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }



}


// for delete options




