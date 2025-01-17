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
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.trim().length >= 2;
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /[a-z|A-Z|0-9]+@[a-z]+\.[a-z]+/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    }
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
