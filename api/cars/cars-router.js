/* eslint-disable */

const Car = require("./cars-model");
const router = require("express").Router();
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  await Car.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkCarId, async (req, res, next) => {
  await Car.getById(req.params.id)
    .then((car) => {
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: "car not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    await Car.create(req.body)
      .then((addCar) => {
        res.status(201).json(addCar);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
