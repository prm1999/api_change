// importing data from the model
const Tour=require('./../models/tourModel');
// Importing Utity Method
const APIFeatures =require('../utils/apiFeatures');

// Importing API
const catchAsync=require('./../utils/catchAsync')

// middleware
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
 };
      

    // for get api
exports.getAllTours=catchAsync(async (req,res)=>{
// try{
// EXECUATE QUERY
    const feature=new APIFeatures(Tour.find(),req.query)
                    .filter()
                    .sort()
                    .limitfilds()
                    .pagginate();


    const tours=await feature.query;
    // console.log(tours)

    // SEND RESPONSE
    res.status(200).json({

        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })

    // }catch(err){
    //     res.status(200).json({
    //         status:'fail',
    //         message:err
    //     })
    // }
    

})


// for get api on the basis of the id
exports.getTour=catchAsync(async (req,res)=>{

    // try{
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
    // }catch(err){
    //     res.status(200).json({
    //         status:'fail',
    //         message:err
    //     })
    // }


})



// for post api
exports.createTour=catchAsync(async (req,res,next)=>{
    // Instead of new tour and then save we require the save the tour
    const newTour=await  Tour.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
    });
    // try{

            // const newTour=new Tour({});
    //  Tour.save()


    // }
    // catch(err){
    //     res.status(400).json({
    //         status:'fail',
    //         message:err
    //     })
    // }


    });


exports.updateTour=catchAsync(async(req,res)=>{

    // try{
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
    

    // }
    // catch(err){
    //     res.status(400).json({
    //         status:'fail',
    //         message:err
    //     })
    // }


})



exports.deleteTour=catchAsync(async(req,res)=>{

    // try{
        const tour= await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:'success',
            data:null
        })
        

    // }
    // catch(err){
    //     res.status(400).json({
    //         status:'fail',
    //         message:err
    //     })
    // }



})

exports.getTourStats=catchAsync(async(req,res)=>{
    // try{
        const stats=await Tour.aggregate([
            {
                $match:{ ratingsAverage :{$gte:4.5}}
            },
            {
                $group:{
                    _id:{ $toUpper: '$difficulty' },
                    numTour:{$sum:1},
                    numRating:{$sum:'$ratingsAverage'},
                    avgRating:{$avg:'$ratingsAverage'},
                    averagePrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'}
                }
            },
            {
                $sort:{averagePrice:1}
            },
            // not include this id
            // {
            //     $match:{_id:{$ne:'EASY'}}
            // }

        ]
        )
        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        })


    // }
    // catch(err){
    //     res.status(404).json({
    //         status:'fail',
    //         message:err
    //     })
    // }
})

// Monthly 
exports.getMonthlyPlan = catchAsync(async (req, res) => {
    // try {
      const year = req.params.year * 1; // 2021
  
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        // filter by months
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            // creating the array for per filter
            tours: { $push: '$name' }
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err
    //   });
    // }
  })




