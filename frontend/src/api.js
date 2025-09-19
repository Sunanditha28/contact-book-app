import axios from "axios";

export const fetchContacts = (page, limit) =>
  axios.get(`/contacts?page=${page}&limit=${limit}`);

export const createContact = (data) => axios.post("/contacts", data);

export const removeContact = (id) => axios.delete(`/contacts/${id}`);
