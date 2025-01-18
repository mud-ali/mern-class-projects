const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()
const Contact = require("./models/contact")

app.use(cors())
app.use(express.json())
app.use(express.static("dist"))

const PORT = process.env.PORT || 4343;

const errorHandler = (error, req, res, next) => {
    console.log("error message: ", error.message);
    if (error.message.includes("Not found")) {
        return res.status(404).json({ error: "No such contact found" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: "Schema validation failed." });
    } else {
        return res.status(500).json({ error: "An error occurred" });
    }
};

app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json(contacts);
});

app.get("/api/contacts/:id", async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        throw new Error("Not found");
    } else {
        res.json(contact);
    }
}) 

app.delete("/api/contacts/:id", async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (contact) {
            return res.status(204).json({ message: "Contact deleted successfully" });
        } else {
            throw new Error("Not found");
        }
    } catch (error) {
        next(error);
    }
})

app.put("/api/contacts/:id", async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }
        );

        if (!contact) {
            throw new Error("Not found");
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
});

app.post("/api/contacts", async (req, res, next) => {
    try {
        const missing = ["name", "email"].filter(field => !Object.keys(req.body).includes(field))
        if (missing.length) {
            return res.status(400).json({ error: "Missing required fields " + missing.join(", ") })
        }
        const id = Math.floor(Math.random() * Date.now() * Date.now()).toString(16);

        if (Contact.find({ email: req.body.email }).length)
            return res.status(409).json({ error: `Email ${req.body.email} is already in contacts` })

        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email
        });

        await newContact.save({ validateBeforeSave: true });

        return res.json(newContact);
    } catch (e) {
        next(e);
    }
})

app.get("/api/info", async (req, res) => {
    try {
        const numberOfContacts = await Contact.countDocuments()
        res.send(`i have ${numberOfContacts} contact${numberOfContacts>1?'s' : ''}`)  
    } catch (e) {
        throw new Error("Error fetching info")
    }
})

app.use(errorHandler)

app.listen(port=PORT, ()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}`)
})