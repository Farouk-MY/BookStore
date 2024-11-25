import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-black bg-yellow-100 mt-10 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Contact Us */}
          <div className="border border-gray-300 p-6 rounded-lg w-full lg:w-1/4 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2">WWW.TheReaders.com</li>
              <li className="mb-2">5-502 Sabil, Pagasus, Ahmedabad</li>
              <li className="mb-4">(012) 345 6789 000</li>
              <div className="flex justify-center lg:justify-start space-x-4 mt-4">
                <a href="https://facebook.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={24} />
                </a>
                <a href="https://youtube.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={24} />
                </a>
              </div>
            </ul>
          </div>

          {/* About Us, Categories, Quick Help */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:w-2/4">
            {/* About Us */}
            <div className="border border-gray-300 p-6 rounded-lg text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Banners & Noble, Inc.</a></li>
                <li><a href="#" className="hover:underline">Authors</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="border border-gray-300 p-6 rounded-lg text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Coupons</a></li>
                <li><a href="#" className="hover:underline">E-Catalogs</a></li>
                <li><a href="#" className="hover:underline">Order Form</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>

            {/* Quick Help */}
            <div className="border border-gray-300 p-6 rounded-lg text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Order Status</a></li>
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
                <li><a href="#" className="hover:underline">Covid Safety</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border border-gray-300 p-6 rounded-lg w-full lg:w-1/4 text-black">
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter!</h3>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 text-gray-700 rounded-l-lg w-full border-none focus:outline-none"
              />
              <button className="bg-white text-yellow-500 px-4 py-2 rounded-r-lg hover:bg-gray-100">
                Submit
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src="assets/bee.png"
                alt="Girl Reading"
                className="h-32 w-32 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="flex justify-center space-x-4 mt-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Play_2022_icon.svg" alt="Google Pay" className="h-8" />
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; Copyright The Readers. All rights reserved.</p>
          <p>Site By DSI Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
