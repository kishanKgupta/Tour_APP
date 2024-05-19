const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");


const app = express();
//middleware that modify incoming data in json
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development")
{
  app.use(morgan("dev"));
}




//the middleware help to execute every operation for each request
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Route
//mounting router...
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

//static routing
//app.get('/api/v1/tours', getAllTours);

//dynamic routing
//app.get('/api/v1/tours/:id', getTour);

//app.post('/api/v1/tours', createTour);

//app.patch('/api/v1/tours/:id', updateTour);

//app.delete('/api/v1/tours/:id', deleteTour);

// app.get('/',(req,res)=> {
//     res.status(200).send("Server active!");
//    // res.status(200).json({message:'hello',app:'natours'})
// })

// app.post('/', (req, res) => {
//     res.send("you can post to this endpoint!");
// })
