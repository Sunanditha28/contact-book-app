import { useEffect, useState } from "react";
import { fetchContacts } from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    const res = await fetchContacts(page, limit);
    setContacts(res.data.contacts);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, [page]);

  const handleAdd = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
    setTotal((prev) => prev + 1);
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setTotal((prev) => prev - 1);
  };

  return (
    <div className="container">
      <h1>📒 Contact Book</h1>
      <ContactForm onAdd={handleAdd} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactList contacts={contacts} onDelete={handleDelete} />
      )}
      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}

export default App;
