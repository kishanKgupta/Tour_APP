const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
   if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
}
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
  {
    return res.status(400).json({
      status: 'fail',
      message:'Missing name or price'
    })
  }
  next();
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  //{ id: '0' }
  const id = Number(req.params.id);
  const tour = tours.find((user) => user.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
  // return res.json(user);
  //res.sendFile(__dirname+'/public/tour.html')
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );

  // console.log(req.body);
  //res.send('Done');
};

exports.updateTour = (req, res) => {
  
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};