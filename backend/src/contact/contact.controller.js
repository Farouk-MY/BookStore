const Contact = require("./contact.model");

const postContact = async (req, res) => {
  try {
    const newContact = await Contact({ ...req.body });
    await newContact.save();
    res
      .status(200)
      .send({ message: "Contact posted successfully", contact: newContact });
  } catch (error) {
    console.error("Error posting contact", error);
    res.status(500).send({ message: "Failed to post Contact" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination support
    const contacts = await Contact.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Contact.countDocuments();
    res.status(200).send({
      message: "Contacts fetched successfully",
      data: contacts,
      total,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching contacts", error);
    res.status(500).send({ message: "Failed to fetch contacts" });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id); // Find contact by ID
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).send({ message: "Contact fetched successfully", contact });
  } catch (error) {
    console.error("Error fetching contact", error);
    res.status(500).send({ message: "Failed to fetch contact" });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id); // Delete contact by ID
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).send({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact", error);
    res.status(500).send({ message: "Failed to delete contact" });
  }
};

module.exports = {
  postContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
