require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");

// env vars
require("dotenv").config()

// set my routes up
const routes = require("./routes");

let app = express();

// setup some handlebar helpers myself
let hbs = exphbs.create({
  helpers: {
    eq: (a, b) => {
      return a === b;
    },
    and: (a, b) => {
      return a && b;
    },
  },
});

// express setup
app.use(morgan("dev"));

// use handlebars as my view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use("/assets", express.static("assets"));

// setup my routes
app.use("/", routes);

// Handle 404s
app.use((req, res) => {
  res.status(404);
  res.send("404: Page not found!");
});

// Handle 500 status code (and anything else, i think?)
app.use((error, req, res) => {
  console.error(error.stack);
  res.status(500);
  res.send(`Internal Server Error: ${error}`);
});

app.listen(process.env.PORT, () => {
  // mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  //   if (err) throw err;
  //   console.log('Connected to mogno');
  // });
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});