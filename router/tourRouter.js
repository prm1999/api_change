const express=require('express');
const authController=require('./../controller/authController');
const tourController=require('./../controller/tourController');
const router=express.Router();


// router.param('id',tourController.checkID);


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// use param intead of  id

router.route('/tour-static').get(tourController.getTourStats);
// for planned fiter per year
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
    .route('/')
    .get(authController.protect,tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);



module.exports=router;
