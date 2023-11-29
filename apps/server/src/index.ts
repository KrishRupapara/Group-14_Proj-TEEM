import dotenv from "dotenv";
dotenv.config();

import express from "express";

import https from "https";
import fs from "fs";

// const cert = fs.readFileSync("../server.key");
// const key = fs.readFileSync("../server.cert");

// create an HTTPS server with the self-signed certificate and private key
// const server = https.createServer({ key: key, cert: cert }, app);

//routers
import {
  authRouter,
  workspaceRouter,
  dashboardRouter,
  taskRouter,
  meetRouter,
} from "./routes";

//middlewares
import { requireAuth } from "./middleware/authMiddleware";

import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { client as redisClient } from "./config/redisConnect";
import morgan from "morgan";
import { dashboardGet } from "./controllers";

export const app: express.Application = express();
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
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api", workspaceRouter);
app.use("/api", dashboardRouter);
app.use("/api", taskRouter);
app.use("/api", meetRouter);

app.get("/", requireAuth, dashboardGet);

redisClient.on("error", (err) => {
  throw new Error("Redis not connected!!");
});

//this is protected route
app.get("/smoothies", requireAuth, (req, res) => {
  res.send("Only for logged in user");
});

const PORT = process.env.PORT || 3500;

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "!");
});

module.exports = app;