require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
    .connect(DB_URI)
    .then(() => console.log("DB Connection Established"))
    .catch((e) => {
        console.log("Error connecting the DB: ", e.message);
    });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// configure toJSON method
contactSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

// create mongoose model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
