var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var postRouter = require("./routes/postApi");

var app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://tejash:gamecar976@ds345597.mlab.com:45597/heroku_qghjvhzn"
);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.IPaddress = req.connection.remoteAddress;
  next();
});

//routes
app.use("/api", postRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json(err);
});

app.listen(process.env.port || 4000, () => console.log("Now listening"));
