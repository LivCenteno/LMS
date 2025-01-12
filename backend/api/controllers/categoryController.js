const knex = require("../models/connection_db");
const util = require("./util");

const insertCategory = async (req, res, next) => {
  try {
    let name = req.body.name;

    if (!name) {
      return res.status(400).json({
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
module.exports = { insertCategory };
