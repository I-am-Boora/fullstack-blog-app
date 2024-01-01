import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./utils/app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server running on Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error handling with mongodb connection", error);
  });
