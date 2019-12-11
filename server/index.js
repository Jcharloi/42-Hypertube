import "./dotenv.config";
import express from "express";
import morgan from "morgan";
import path from "path";
import favicon from "serve-favicon";
import fileUpload from "express-fileupload";

import router from "./router";

const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
export const ioConnection = io;

app.set("root", "/");
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(favicon(path.join(__dirname, "views", "favicon.ico")));
app.use("/public", express.static("public"));
app.use(morgan("dev"));
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use("/api", router);
app.get("*", (req, res) => {
  res.render("index");
});

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("join-movie-room", movieId => {
    console.log("Joined movie room");
    socket.join(movieId);
  });

  socket.on("leave-movie-room", movieId => {
    console.log("Left movie room");
    socket.leave(movieId);
  });
});

http.listen(8080, () => {
  console.log("Server running on 8080");
});
