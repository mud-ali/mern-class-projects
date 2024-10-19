import { useState } from "react";
import "./index.css";

const App = () => {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    
    const [contacts, setContacts] = useState([
        { name: "John Doe", id: 1, email: "johndoe@gmail.com" },
        { name: "Jane Smith", id: 2, email: "janesmith@gmail.com" },
        { name: "Michael Johnson", id: 3, email: "michaeljohnson@gmail.com" },
        { name: "Emily Davis", id: 4, email: "emilydavis@gmail.com" },
        { name: "David Brown", id: 5, email: "davidbrown@gmail.com" }
    ]);
    const [searchTerm, setSearchTerm] = useState("");

    const validateContactDetails = (name, email) => {
        if (name.trim() === "") {
            alert("Name length must be greater than 0 and should not be just spaces")
            return false;
        }
        if (email.trim() === "" || !email.match(/[A-Za-z0-9\.\-]+@.*\..*/gi)) {
            alert("Email field required and must follow the format of something@something.something")
            return false;
        }
        if (contacts.filter(c => c.name === name.trim()).length) {
            alert("That contact already exists");
            return false;
        }

        return name.trim();
    }

    const handleContactInfoChange = (e) => {
        if (e.target.type === "email") {
            setNewEmail(e.target.value);
        } else {
            setNewName(e.target.value);
        }
    }

    const addContact = (e) => {
        e.preventDefault();
        
        const parsedName = validateContactDetails(newName, newEmail);
        if (!parsedName) return;

        const newId = contacts.length + 1;
        setContacts([
            ...contacts,
            { name: parsedName, id: newId, email: newEmail}
        ]);
        setNewEmail("");
        setNewName("");
    }

    const searchContacts = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value.toLowerCase());
    }

    return (
        <div className="contacts-app">
            <h2>Add a New Contact</h2>
            <form>
                <input
                    type="text"
                    placeholder="Enter contact name"
                    onChange={handleContactInfoChange}
                    value={newName}
                />
                <input
                    type="email"
                    placeholder="Enter contact email"
                    onChange={handleContactInfoChange}
                    value={newEmail}
                />
                <button type="submit" onClick={addContact}>Add Contact</button>
            </form>
            <h2>Contact List</h2>
            <form>
                <input type="text" onChange={searchContacts}/>
            </form>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.filter(
                            contact => 
                                contact.name.toLowerCase().includes(searchTerm) ||
                                contact.email.toLowerCase().includes(searchTerm) ||
                                searchTerm.trim() === ""
                        ).map((contact, index) => {
                            return (
                                <tr key={contact.id} className={index % 2 === 0 ? "green-row" : "green-row-dark"}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        searchTerm.trim() === "" || contacts.filter(
                            contact => 
                                contact.name.toLowerCase().includes(searchTerm) ||
                                contact.email.toLowerCase().includes(searchTerm)
                        ).length === 0 ?
                            <tr className="green-row">
                                <td colSpan={2} className="err">
                                    No results found
                                </td>
                            </tr>
                        : <></>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default App;