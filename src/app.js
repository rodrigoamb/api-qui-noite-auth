import express from "express";
import router from "./routes/router.js";
import sequelize from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/api", router);

sequelize
  .sync()
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Synchronization error:", err));

export default app;
