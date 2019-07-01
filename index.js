var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var postRouter = require("./routes/postApi");
var path = require("path");

var app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://tejash:gamecar976@ds345597.mlab.com:45597/heroku_qghjvhzn"
);

app.use(express.static("client/build"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // req.IPaddress = req.connection.remoteAddress;
  req.IPaddress = req.headers["x-forwarded-for"];
  next();
});

//routes
app.use("/api", postRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json(err);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 4000, () => console.log("Now listening"));
