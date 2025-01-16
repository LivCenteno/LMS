const knex = require("../models/connection_db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const util = require("./util");

const createUser = async (req, res, next) => {
  try {
    let role = req.body.role;
    let firstName = req.body.firstName;
    let middleInitial = req.body.middleInitial;
    let lastName = req.body.lastName;
    let suffix = req.body.suffix;
    let email = req.body.email;
    let password = req.body.password;

    const validationError = util.checkUserInputs(
      role,
      firstName,
      middleInitial,
      lastName,
      suffix,
      email,
      password
    );

    if (validationError) {
      return res.status(400).json({
        successful: false,
        message: validationError,
      });
    } else {
      const isEmailExisting = await knex("user").where({ email }).first();
      if (isEmailExisting) {
        return res.status(400).json({
          successful: false,
          message: "Email Already Exist",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await knex("user").insert({
          role,
          firstName,
          middleInitial,
          lastName,
          suffix,
          email,
          password: hashedPassword,
        });
        return res.status(200).json({
          successful: true,
          message: "Successfully Created User!",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: err.message,
    });
  }
};

const viewUserViaId = async (req, res, next) => {
  let id = req.params.id;

  if (!id) {
    return res.status(404).json({
      successful: false,
      message: "Id is missing",
    });
  } else {
    try {
      const doesIdExist = await knex("user").where("id", id).first();

      if (!doesIdExist) {
        return res.status(404).json({
          successful: false,
          message: "User Does Not Exist",
        });
      } else {
        const data = await knex("user").where("id", id);

        return res.status(200).json({
          successful: true,
          message: "User Successfully Retrieved",
          data: data,
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
  createUser,
  viewUserViaId,
};
