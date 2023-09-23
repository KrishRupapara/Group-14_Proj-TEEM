import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port " + process.env.PORT + "!");
});
