import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Internal Server Error");
// });
//routes import
import userRouter from "../routes/user.routes.js";
//routes declaration

app.use("/users", userRouter);

export { app };
