import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { db } from "./db";
import { users } from "./db/schema";
import cookieParser from "cookie-parser";
// import cookieParser = require("cookie-parser");


dotenv.config();

// const deleteUser = async () => {
//   await db.delete(users);
// };

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// deleteUser();


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "!");
});
