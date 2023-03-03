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
        let queryStr = JSON.stringify(queryObj);
 
        queryStr = queryStr.replace(/\b(gte|te|lte|lt)\b/g, (match) => `$${match}`);
         
        console.log(JSON.parse(queryStr));


            // find is use for the find all the document

            // filter
            // I had the same issue and mine got fixed by replacing the const query = Tour.find(queryObj);  to const query = Tour.find(JSON.parse(queryStr)); just continue following the video.


            let query= Tour.find(JSON.parse(queryStr));

            // Sorting
            if(req.query.sort){
                const sortBy=req.query.sort.split(',').join(' ');
                console.log(sortBy)
                // sort first variable
                query=query.sort(req.query.sort)
            }
            // field limitation
            if(req.query.fields){
                const fields=req.query.fields.split(',').join(' ');
                query=query.select(fields);

            }
            else{
                // for removing v
                query=query.select('-__v');
            }
            // Pagination page=2 & limit=10 1-10 page 1 10-20 page2
            const page=req.query.page*1||1;  
            const limit =req.query.limit*1||100;
            const skip=(page-1)*limit;  
            query=query.skip(skip).limit(limit);
            // Return number of document
            if (req.query.page){
                const numTour=await Tour.countDocuments();
                if(skip>=numTour) throw new Error('This page does not exist');

            }
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




