// importing file system
// const fs=require('fs');

// importing data from the model
const Tour=require('./../models/tourModel');



// middleware




// for get api
exports.getAllTours=async (req,res)=>{

    try{

            // find is use for the find all the document
    const tours=await Tour.find();


    // console.log(req.requestTime);

    res.status(200).json({

        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })

    }catch(err){
        res.status(200).json.json({
            status:'fail',
            message:err
        })
    }
    

}


// for get api on the basis of the id
exports.getTour=async (req,res)=>{

    try{
        // find by id is use by find using the id
        const tours=await Tour.findById(req.parm.id)
        // Tour.findOne({__id:req.param.id})
        res.status(200).json({

            status:'success',
            results:tours.length,
            data:{
                tours
            }
        })
    }catch(err){
        res.status(200).json.json({
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


exports.deleteTour=(req,res)=>{



    res.status(204).json({
        status:'success',
        data:null
    })
}


// for delete options
exports.updateTour=(req,res)=>{



    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour'
        }
    })
}




