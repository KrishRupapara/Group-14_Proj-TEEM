import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { db } from "./db";
import { users } from "./db/schema";

dotenv.config();

const deleteUser = async () => {
  await db.delete(users);
};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// deleteUser();

app.use("/api", router);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "!");
});
