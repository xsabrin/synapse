import express from "express";
import Collection from "../models/collection.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { ownerEmail, targetEmail } = req.body;

  if (!ownerEmail || !targetEmail) {
    return res.status(400).json({ error: "Missing emails" });
  }

  if (ownerEmail === targetEmail) {
    return res.status(400).json({ error: "Cannot add yourself" });
  }

  await Collection.findOneAndUpdate(
    { ownerEmail },
    {
      $addToSet: {
        contacts: { email: targetEmail }
      }
    },
    { upsert: true }
  );

  res.json({ ok: true });
});

export default router;
