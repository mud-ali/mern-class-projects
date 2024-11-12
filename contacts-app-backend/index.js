const express = require("express")
const app = express()
app.use(express.json())

const PORT = 4343;

let contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
]

app.get("/api/contacts", (req, res)=>{
    res.json(contacts)
});

app.get("/api/contacts/:id", (req, res)=>{
    const contact = contacts.find(c=>c.id==req.params.id);
    if (contact)
        res.json(contact);
    else
        res.status(404).json({error: "No contact with that id found"})
})

app.delete("/api/contacts/:id", (req, res) => {
    const contact = contacts.find(c => c.id == req.params.id);
    if (contact) {
        contacts = contacts.filter(c => c.id != req.params.id);
        return res.status(204).send();
    } else {
        return res.status(404).json({ error: "No contact with that id found" })
    }
})

app.post("/api/contacts", (req, res) => {
    const missing = ["name", "email"].filter(field => !Object.keys(req.body).includes(field))
    if (missing.length) {
        return res.status(400).json({error: "Missing required fields "+missing.join(", ")})
    }
    const id = Math.floor(Math.random() * Date.now() * Date.now()).toString(16);
    if (contacts.some(c => c.email === req.body.email))
        return res.status(409).json({error: `Email ${req.body.email} is already in contacts`})

    const newContact = { id, name: req.body.name, email: req.body.email};

    contacts.push(newContact);

    return res.status(201).json(newContact);
})

app.get("/api/info", (req, res)=>{
    res.send(`
    <h1>Contacts Web Server</h1>
    <p>You have ${contacts.length} contacts</p>`)
});

app.listen(port=PORT, ()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})