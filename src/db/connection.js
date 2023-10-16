const mongoose = require("mongoose");
const configs = require("../config");
const { DB_USERNAME, DB_PASSWORD } = configs;

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.nkokcbf.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Connection failed"));
