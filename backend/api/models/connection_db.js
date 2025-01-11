require("dotenv").config();
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD, // Uncomment this if you have a password
    database: process.env.DB_DATABASE,
  },
  pool: { min: 0, max: 7 },
});

module.exports = knex;
