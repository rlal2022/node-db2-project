/* eslint-disable */
// STRETCH
const cars = [
  {
    vin: "3G7DA03E02S551819",
    make: "toyota",
    model: "prius",
    mileage: 215000,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "4VG7DARH7XN757841",
    make: "toyota",
    model: "corolla",
    mileage: 115000,
    title: "salvage",
  },
  {
    vin: "WBAVC53537FZ60998",
    make: "ford",
    model: "focus",
    mileage: 15000,
  },
];

exports.seed = function (knex) {
  return knex("cars")
    .truncate()
    .then(() => {
      return knex("cars").insert(cars);
    });
};
