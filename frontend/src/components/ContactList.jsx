import { removeContact } from "../api";

export default function ContactList({ contacts, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact?")) {
      await removeContact(id);
      onDelete(id);
    }
  };

  return (
    <ul>
      {contacts.map((c) => (
        <li key={c.id}>
          {c.name} - {c.email} - {c.phone}
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
