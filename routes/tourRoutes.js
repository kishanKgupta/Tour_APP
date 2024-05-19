const express = require('express');
const tourController = require('./../controllers/tourController');


const router = express.Router();

//the param middleware run with certain parameter...
//the id present then run the code
router.param('id', tourController.checkID)

//create a checkbody middleware
//Check if body contains the name and price propertity
//if not, send back 400 (bad request)
//Add it to the post handler stack



router.route("/").get(tourController.getAllTours).post(tourController.checkID,tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;