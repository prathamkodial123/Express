const asyncHanlder = require("express-async-handler");
// const Contact = require("../models/contactModel");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route GET api/contacts
//@access public
const getContacts = asyncHanlder(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New contacts
//@route POST api/contacts
//@access public
const createContact = asyncHanlder(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }
    const ob = Contact.create({ name, email, phone });
    res.status(201).json(ob);
});

//@desc Get Contact
//@route POST api/contacts/:id
//@access public
const getContact = asyncHanlder(async (req, res) => {
    const ob = Contact.findById(req.params.id)
    if (!ob) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(ob);
});

//@desc Update contacts
//@route POST api/contacts
//@access public
const updateContact = asyncHanlder(async (req, res) => {
    res.status(201).json({ message: "update contacts" });
});

//@desc Delete Contact
//@route POST api/contacts/:id
//@access public
const deleteContact = asyncHanlder(async (req, res) => {
    res.status(200).json({ message: "delete contacts" });
});
module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
