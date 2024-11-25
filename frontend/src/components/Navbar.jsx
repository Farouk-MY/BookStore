import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const token = localStorage.getItem("token");

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-white">
      <nav className="flex justify-between items-center py-6 px-8">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="/assets/bee.png"
              alt="Logo"
              className="h-[55px] w-[85px]"
            />
          </Link>
          <p className="font-cinzel text-3xl hidden md:block">
            <span className="text-yellow-500">B</span>ee
            <span className="text-yellow-500">S</span>tore
          </p>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center flex-grow max-w-2xl mx-8">
          <div className="relative w-full flex">
            {/* Category Dropdown */}
            <select className="py-3 px-4 border-2 font-cinzel border-gray-300 rounded-l-full focus:outline-none">
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="children">Children's</option>
              <option value="sci-fi">Science Fiction</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search books, authors, novels..."
              className="w-full py-3 px-6 text-lg border-2 border-gray-300 rounded-r-full font-cinzel focus:outline-none"
            />
            <button className="absolute right-3 top-0 mt-1.5 bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-all">
              <IoSearchOutline />
            </button>
          </div>
        </div>

        {/* Right Side: User Actions */}
        <div className="flex items-center space-x-4">
          <button>
            <img
              src="/assets/beehive.png" // Using the honey jar image
              alt="Honey Jar"
              className="cursor-pointer w-7 h-7 hover:text-yellow-500" // Adjust image size and hover effect
            />
          </button>
          <div className="relative">
            <Link to="/cart">
              <img
                src="/assets/honey.png" // Using the honey jar image
                alt="Honey Jar"
                className="cursor-pointer w-7 h-7 hover:text-yellow-500" // Adjust image size and hover effect
              />
              {cartItems.length > 0 && (
                <span className="absolute bottom-0 left-3 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[0.6rem] transform translate-x-1/4 translate-y-1/4">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
          {currentUser ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={avatarImg}
                  alt="Avatar"
                  className={`h-8 w-8 rounded-full ${
                    currentUser ? "ring-2 ring-blue-500" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : token ? (
            <Link to="/dashboard" className="border-b-2 border-primary">
              Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 transition-all"
            >
              Become a Bee
            </Link>
          )}
        </div>
      </nav>

      {/* Navigation Links with smooth scroll */}
      <ul className="flex justify-center space-x-6 pb-4 text-gray-600 w-full">
        <li className="relative group text-center">
          <Link to="/" className="py-2 px-3 font-cinzel cursor-pointer">
            Home
          </Link>
          <span className="absolute left-0 bottom-[-2px] h-[5px] bg-yellow-500 w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group text-center">
          <Link
            to="#shop"
            onClick={scrollToShop}
            className="py-2 px-3 font-cinzel cursor-pointer"
          >
            Shop
          </Link>
          <span className="absolute left-0 bottom-[-2px] h-[5px] bg-yellow-500 w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group text-center">
          <Link to="/contact" className="py-2 px-3 font-cinzel cursor-pointer">
            Contact
          </Link>
          <span className="absolute left-0 bottom-[-2px] h-[5px] bg-yellow-500 w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
