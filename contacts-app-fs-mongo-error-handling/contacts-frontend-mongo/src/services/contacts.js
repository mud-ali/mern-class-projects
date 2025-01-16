import axios from "axios";

const baseURL = "/api/contacts";

const getContacts = () => {
    return axios.get(baseURL).then((res) => res.data);
};

const addContact = (contactData) => {
    return axios.post(baseURL, contactData).then((res) => res.data);
};

const updateContact = (contact) => {
    return axios.put(`${baseURL}/${contact.id}`, contact)
        .then((res) => res.data);
};

const deleteContact = (contact) => {
    return axios.delete(`${baseURL}/${contact.id}`)
}

export default { getContacts, addContact, updateContact, deleteContact};
