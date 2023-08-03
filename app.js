const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/usersrouter");
const collegeRoutes = require("./routes/collegerouter");
const storeRoutes = require("./routes/storesrouter");

const app = express();

app.use(express.json()); // This is used to parse JSON bodies from incoming requests

//app.use(validator.validateUser())
app.use("/users", userRoutes); // Use user routes when '/users' is called
app.use("/colleges", collegeRoutes);
app.use("/stores", storeRoutes);

module.exports = app; // Export the app
