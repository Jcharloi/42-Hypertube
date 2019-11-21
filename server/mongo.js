import mongoose from "mongoose";

const URL_DB =
  "mongodb+srv://root:root@hypertube-fdnbo.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

export default mongoose;
