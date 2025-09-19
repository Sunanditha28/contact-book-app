import { useState } from "react";
import { createContact } from "../api";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.phone) {
        setError("All fields are required");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        setError("Invalid email");
        return;
      }
      if (!/^\d{10}$/.test(form.phone)) {
        setError("Phone must be 10 digits");
        return;
      }

      const res = await createContact(form);
      onAdd(res.data);
      setForm({ name: "", email: "", phone: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
