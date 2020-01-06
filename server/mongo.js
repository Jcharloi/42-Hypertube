import "./dotenv.config";
import mongoose from "mongoose";

const URL_DB = process.env.DB_URL;

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

export default mongoose;
