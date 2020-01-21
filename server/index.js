import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import router from "./router";

const app = express();
app.set("root", "/");
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(favicon(path.join(__dirname, "views", "favicon.ico")));
app.use("public/", express.static("public"));
app.use(morgan("dev"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());

/* Webpack Hot Reload */
const webpack = require("webpack");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config.js");

const compiler = webpack(webpackConfig);
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(hotMiddleware);

/* eslint-enable */
/* ------------------ */

app.use("/API", router);
app.get("*", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Server running on 8080");
});
