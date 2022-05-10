require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const cors = require("cors"); // for locally test not sure for Pro version

const app = express();
app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }) // for locally test not sure for Pro version
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(authRoutes);
app.use(trackRoutes);
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })); // for locally test not sure for Pro version
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

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email &+${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
