import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import "./index.css";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts"
import ErrorModal from "./components/Error";

const App = () => {

    const [error, setError] = useState("");

    const [contacts, setContacts] = useState([]);

    useEffect(()=>{
        contactService.getContacts().then(data => setContacts(data));
    }, [])

    const validateContactDetails = (name, email) => {
        if (name.trim() === "") {
            setError("Name length must be greater than 0 and should not be just spaces")
            return false;
        }
        if (email.trim() === "") {
            setError("Email field required and must follow the format of something@something.something")
            return false;
        }

        return name.trim();
    }

    const newContact = async (e, newName, newEmail) => {
        e.preventDefault();
        
        const parsedName = validateContactDetails(newName, newEmail);
        if (!parsedName) {
            setError("Name does not meet criteria")
            return;
        }

        const existingContacts = contacts.filter(c => c.name === parsedName.trim());
        let newContactInfo = {
            name: parsedName,
            email: newEmail
        };

        try {
            if (existingContacts.length > 0) {
                newContactInfo.id = existingContacts[0].id;
                await contactService.updateContact(newContactInfo);
            } else {

                newContactInfo.id = "" + ((Number(contacts.toSorted((a, b) => b.id - a.id)[0]) + 1) || 0);
                await contactService.addContact(newContactInfo)
            }

            contactService.getContacts().then(data => setContacts(data));
        } catch (e) {
            console.log(e)
            setError(e)
        }
    }

    const handleDelete = (contact) => {
        if (!confirm(`Are you sure you want to delete the contact for ${contact.name}`)) return;

        contactService.deleteContact(contact).then((det)=>{
            contactService.getContacts().then(data => setContacts(data));
        });
    }

    return (
        <div className="contacts-app">
            <ErrorModal error={error}/>
            <AddContact addContact={newContact} />
            <ContactList contacts={contacts} deleteContact={handleDelete} />
        </div>
    );
};

export default App;