import express from "express";
import Profile from "../models/profile.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, avatar } = req.body;

  if (!email) return res.status(400).json({ error: "Missing email" });

  const exists = await Profile.findOne({ email });
  if (exists) {
    return res.json({ ok: true, existing: true });
  }

  const [firstName, ...rest] = name?.split(" ") || [];
  const lastName = rest.join(" ");

  await Profile.create({
    firstName,
    lastName,
    email,
    avatar
  });

  res.json({ ok: true, created: true });
});

export default router;
