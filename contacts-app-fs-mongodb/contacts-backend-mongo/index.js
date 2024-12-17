const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()
const Contact = require("./models/contact")

app.use(express.json())
app.use(express.static("dist"))
app.use(cors())

const PORT = process.env.PORT || 4343;

app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json(contacts);
});

app.get("/api/contacts/:id", async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ error: "Contact not found" });
    } else {
        res.json(contact);
    }
})

app.delete("/api/contacts/:id", async (req, res) => {
    const contact = (await Contact.find({})).find(c => c.id == req.params.id);
    if (contact) {
        contacts = contacts.filter(c => c.id != req.params.id);
        return res.status(204).send();
    } else {
        return res.status(404).json({ error: "No contact with that id found" })
    }
})

app.post("/api/contacts", async (req, res) => {
    const missing = ["name", "email"].filter(field => !Object.keys(req.body).includes(field))
    if (missing.length) {
        return res.status(400).json({error: "Missing required fields "+missing.join(", ")})
    }
    const id = Math.floor(Math.random() * Date.now() * Date.now()).toString(16);
    if (contacts.some(c => c.email === req.body.email))
        return res.status(409).json({error: `Email ${req.body.email} is already in contacts`})

    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email
    });

    await newContact.save();

    return res.json(newContact);
})

app.get("/api/info", (req, res)=>{
    res.send(`
    <h1>Contacts Web Server</h1>
    <p>You have ${contacts.length} contacts</p>`)
});

app.listen(port=PORT, ()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})