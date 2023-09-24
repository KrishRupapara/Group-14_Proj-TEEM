import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
// import bodyparser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use(bodyparser);
// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );

// app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log("Server listening on port " + process.env.PORT + "!");
});
