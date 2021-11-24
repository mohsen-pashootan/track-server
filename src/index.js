const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoUri =
  "mongodb+srv://mohsen-admin:mohsen-password@track-server-cluster.osiil.mongodb.net/track-server-cluster?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  //   useCreateIndex: true, // Deprecated
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to mongo", error);
});

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
