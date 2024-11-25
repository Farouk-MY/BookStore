import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Debugging: log form data
    try {
      const response = await fetch(
        "http://localhost:5000/api/contact/post-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      toast.success("Your message has been sent!", { position: "top-center" });

      // Clear form inputs
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send your message.", { position: "top-center" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src="assets/bee2.jpg"
            alt="Customer Service"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Send us a message</h2>
          <p className="text-gray-600 mb-6">
            Your satisfaction is our top priority, and we are committed to
            providing exceptional service and support.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Phone"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows="5"
                placeholder="Message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Address Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-5 rounded-full bg-primary shadow-lg flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.25 12 22 12 22C12 22 19 13.25 19 9C19 5.13401 15.866 2 12 2Z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
          </div>
          <p className="mt-4 text-gray-600 font-bold">Address</p>
          <p>789 Oak Lane, Lakeside, TX 54321</p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-5 rounded-full bg-primary shadow-lg flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 2L22 22" />
              <path d="M6.5 6.5C8.83333 4.5 15.5 4.5 17.8333 6.5C18.8889 7.5 18.3333 8.66667 16.5 10.5C15 12 13.8333 13.5 12 15.5C10.6667 17.3333 9.66667 18.3333 8.5 19.5C6.66667 21.3333 5.5 20.7778 4.5 19.7222C2.5 17.3889 2.5 10.7222 4.5 8.38889C6.33333 6.55556 7.5 6 9.5 7.5C11.5 9 13.5 10 15.5 12" />
            </svg>
          </div>
          <p className="mt-4 text-gray-600 font-bold">Contact</p>
          <p>1800-2541-2541, 1800-14-0147</p>
        </div>

        {/* Email Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-5 rounded-full bg-primary shadow-lg flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8l8 6 8-6" />
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            </svg>
          </div>
          <p className="mt-4 text-gray-600 font-bold">Email</p>
          <p>pagestone1234&#64;gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
