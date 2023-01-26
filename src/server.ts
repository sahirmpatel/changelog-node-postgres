import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// url encoded for using query strings
app.use(express.urlencoded({ extended: true }));

app.use;

app.get("/", (req, res) => {
  res.json({ message: "sneed" });
});

app.use("/api", router);

app.get("/", (req, res) => {
  console.log("hello from exp");
  res.json({ message: "sneed" });
});

export default app;
