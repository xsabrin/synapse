import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/trade", (req, res) => {
  res.json({ success: true });
});

export default app;
