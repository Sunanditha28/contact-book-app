require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add Contact
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // simple validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Phone must be 10 digits" });
    }

    const newContact = await db.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Contacts with pagination
app.get("/contacts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const { rows, total } = await db.getContacts({ page, limit });
    res.json({ contacts: rows, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    await db.deleteContact(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
