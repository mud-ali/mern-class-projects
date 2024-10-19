import { useState } from "react";
import AddContact from "./components/AddContact";
import "./index.css";
import ContactList from "./components/ContactList";

const App = () => {

    const [contacts, setContacts] = useState([
        { name: "John Doe", id: 1, email: "johndoe@gmail.com" },
        { name: "Jane Smith", id: 2, email: "janesmith@gmail.com" },
        { name: "Michael Johnson", id: 3, email: "michaeljohnson@gmail.com" },
        { name: "Emily Davis", id: 4, email: "emilydavis@gmail.com" },
        { name: "David Brown", id: 5, email: "davidbrown@gmail.com" }
    ]);

    const validateContactDetails = (name, email) => {
        if (name.trim() === "") {
            alert("Name length must be greater than 0 and should not be just spaces")
            return false;
        }
        if (email.trim() === "") {
            alert("Email field required and must follow the format of something@something.something")
            return false;
        }
        if (contacts.filter(c => c.name === name.trim()).length) {
            alert("That contact already exists");
            return false;
        }

        return [name.trim(), email.trim()];
    }

    const addContact = (e, newName, newEmail) => {
        e.preventDefault();
        
        const parsedName = validateContactDetails(newName, newEmail);
        if (!parsedName) return;

        const newId = contacts.length + 1;
        setContacts([
            ...contacts,
            { name: parsedName, id: newId, email: newEmail}
        ]);
    }

    return (
        <div className="contacts-app">
            <AddContact addContact={addContact} />
            <ContactList contacts={contacts} />
        </div>
    );
};

export default App;