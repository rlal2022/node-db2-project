/* eslint-disable */
const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = (car) => {
  const { car_id } = db("cars").insert(car);
  return getById(car_id);
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
