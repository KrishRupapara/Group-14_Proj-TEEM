import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

//routers
import { authRouter } from "./routes";

//middlewares
import { requireAuth } from "./middleware/authMiddleware";

import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { client as redisClient } from "./config/redisConnect";
import { findSessions } from "./services/sessionServies";

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

redisClient.on("error", (err) => {
  throw new Error("Redis not connected!!");
});

//this is protected route
app.get("/smoothies", requireAuth, (req, res) => {
  res.send("Only for logged in user");
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "!");
});
