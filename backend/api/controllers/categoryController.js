const knex = require("../models/connection_db");
const util = require("./util");

const insertCategory = async (req, res, next) => {
  try {
    let name = req.body.name;

    if (!name) {
      return res.status(404).json({
        successful: false,
        message: "Name is missing",
      });
    } else {
      const isCategoryNameExisting = await knex("category")
        .where({ name })
        .first();

      if (isCategoryNameExisting) {
        return res.status(400).json({
          successful: false,
          message: "Category Name Already Exist",
        });
      } else {
        await knex("category").insert({ name });

        return res.status(200).json({
          successful: true,
          message: "Successfully Inserted Category",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: err,
    });
  }
};

const viewAllCategories = async (req, res, next) => {
  const status = req.body.status;
  try {
    const data = await knex("category").where("category.status", status);

    if (data.length == 0) {
      return res.status(400).json({
        successful: false,
        message: `No Category with Status:${status} Found`,
      });
    } else {
      return res.status(200).json({
        successful: true,
        message: "Successfully Retrieved All Categories",
        data: data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: err,
    });
  }
};

const updateCategoryStatus = async (req, res, next) => {
  let id = req.params.id;
  let status = req.body.status;
  if (!id || !status) {
    return res.status(404).json({
      successful: false,
      message: "Id or Status not Found",
    });
  } else {
    try {
      const data = await knex("category").where("id", id).first();

      if ((data.length = 0)) {
        return res.status(400).json({
          successful: false,
          message: `There is no Category with the id of ${id}`,
        });
      } else {
        await knex("category").where("id", id).update("status", status);
        return res.status(200).json({
          successful: true,
          message: "Successfully Updated Category Status.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        successful: false,
        message: err,
      });
    }
  }
};
module.exports = {
  insertCategory,
  viewAllCategories,
  updateCategoryStatus,
};
