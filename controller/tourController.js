// importing file system
// const fs=require('fs');

// importing data from the model
const Tour=require('./../models/tourModel');



// middleware




// for get api
exports.getAllTours=(req,res)=>{

    console.log(req.requestTime);

    res.status(200).json({
        status:'success',
    })

}


// for get api on the basis of the id
exports.getTour=(req,res)=>{
    console.log(req.params);

    const id=req.params.id*1;



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




