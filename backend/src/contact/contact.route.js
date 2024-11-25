const express = require('express');
const { postContact, getAllContacts, getContactById, deleteContact } = require('./contact.controller');
const router = express.Router();

// POST route to create a new contact
router.post("/post-contact", postContact);

// GET route to get all contacts
router.get("/get-all-contacts", getAllContacts);

// GET route to get a single contact by ID
router.get("/get-contact/:id", getContactById);

// DELETE route to delete a contact by ID
router.delete("/delete-contact/:id", deleteContact);

module.exports = router;
