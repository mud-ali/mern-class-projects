import { useState } from "react";

const ContactList = ({contacts}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const searchContacts = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value.toLowerCase());
    }

    return (
        <>
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
                        contacts.filter(
                            contact =>
                                contact.name?.toLowerCase().includes(searchTerm) ||
                                contact.email?.toLowerCase().includes(searchTerm) ||
                                searchTerm.trim() === ""
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
        </>
    )
}

export default ContactList;