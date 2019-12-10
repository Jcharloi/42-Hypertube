import mongoose from "mongoose";

// Options to fix all deprecation warnings, has said here:
// https://mongoosejs.com/docs/deprecations.html
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

export default mongoose;
