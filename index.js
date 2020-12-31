require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");

var app = express();

// setup some handlebar helpers myself
var hbs = exphbs.create({
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
  },
});

app.use(morgan("dev"));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:post_id", (req, res) => {
  let post_id = req.params.post_id;
  let post = {
    id: req.params.post_id,
    type: "text",
  };
  res.render("paste", { post: post });
});

app.get("/raw/:post_id", (req, res) => {
  let post_id = req.params.post_id;
  res.send(`Raw ${post_id}`);
});

// Handle 404s
app.use((req, res) => {
  res.status(404);
  res.send("404: Page not found!");
});

// Handle 500 status code
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500);
  res.send(`Internal Server Error: ${error}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
