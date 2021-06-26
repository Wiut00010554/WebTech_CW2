const path = require("path");
const fs = require('fs');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Routes
const feedbacks = require("./routes/feedbacks");
const comments = require("./routes/comments");
const getCollection = require("./utils").getCollection;

// serving static files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Template engine Pug
app.set("view engine", "pug");

//Basic REST API
app.get("/api/v1/feedbacks", (req,res) => {
  fs.readFile("./database/db.json", (err,data) => {
    if(err) throw err

    const todos = JSON.parse(data)

    res.json(todos)
  })
})


// URL'S
app.use("/feedbacks", feedbacks);
app.use("/comments", comments);

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

// listen for requests :)
const listener = app.listen(8000, () => {
  console.log(`App is listening on port  http://localhost:8000`);
});
