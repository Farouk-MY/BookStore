import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import getBaseUrl from "../../../utils/baseURL";



const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all contacts
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getBaseUrl()}/api/contact/get-all-contacts`);
      setContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${getBaseUrl()}/api/contact/delete-contact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r bg-[#F6F1E5] text-gray-800">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-800">📇 Manage Contacts</h1>

        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse bg-white text-gray-800 rounded-lg shadow-lg">
              <thead className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                <tr>
                  <th className="py-4 px-6">Full Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b hover:bg-gray-100 hover:text-gray-900 transition-all"
                  >
                    <td className="py-4 px-6">{contact.fullName}</td>
                    <td className="py-4 px-6">{contact.email}</td>
                    <td className="py-4 px-6">{contact.phone}</td>
                    <td className="py-4 px-6 flex justify-center space-x-3">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <AiFillEye size={20} />
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                        onClick={() => deleteContact(contact._id)}
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Contact Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-center text-yellow-800">
                Contact Details
              </h2>
              <p className="mb-2">
                <strong>Full Name:</strong> {selectedContact.fullName}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {selectedContact.phone}
              </p>
              <p className="mb-4">
                <strong>Message:</strong> {selectedContact.message}
              </p>
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
                onClick={() => setSelectedContact(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContacts;
