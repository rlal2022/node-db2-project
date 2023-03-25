/* eslint-disable */
const Car = require("./cars-model");
const vin = require("vin-validator");
const db = require("../../data/db-config");

async function checkCarId(req, res, next) {
  const car = await Car.getById(req.params.id);
  if (!car) {
    next({
      status: 404,
      message: `Car with id ${req.params.id} is not found `,
    });
  } else {
    req.car = car;
    next();
  }
}

async function checkCarPayload(req, res, next) {
  //   - `checkCarPayload` returns a status 400 with a `{ message: "<field name> is missing" }` if any required field is missing.
  if (!req.body.vin) {
    res.status(400).json({ message: "vin is missing" });
  }
  if (!req.body.model) {
    res.status(400).json({ message: "model is missing" });
  }
  if (!req.body.make) {
    res.status(400).json({ message: "make is missing" });
  }
  if (!req.body.mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

async function checkVinNumberValid(req, res, next) {
  if (vin.validate(req.body.vin)) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
}

async function checkVinNumberUnique(req, res, next) {
  const checkVin = await Car.getByVin(req.body.vin);

  if (checkVin) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

// Write the following middlewares inside `api/cars/cars-middleware.js`:

//   - `checkCarId` returns a status 404 with a `{ message: "car with id <car id> is not found" }` if the id in `req.params` does not exist in the database.

//   - `checkCarPayload` returns a status 400 with a `{ message: "<field name> is missing" }` if any required field is missing.

//   - `checkVinNumberValid` returns a status 400 with a `{ message: "vin <vin number> is invalid" }` if the vin number is [invalid](https://www.npmjs.com/package/vin-validator).

//   - `checkVinNumberUnique` returns a status 400 with a `{ message: "vin <vin number> already exists" }` if the vin number already exists in the database.
