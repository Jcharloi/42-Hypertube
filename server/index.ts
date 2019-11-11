import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
var path = require("path");

const URL_DB =
  "mongodb+srv://root:root@hypertube-fdnbo.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected24554xcccc");
});

const app = express();

var webpack = require("webpack");
var webpackConfig = require("../webpack.config");
var compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
