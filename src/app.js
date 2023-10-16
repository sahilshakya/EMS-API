require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
require("./db/connection");
const route = require("./route");

app.use(express.json());
app.use(cors());
app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
