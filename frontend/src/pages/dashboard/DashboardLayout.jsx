import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { TbBorderAll } from "react-icons/tb";
import { LuContact } from "react-icons/lu";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-white shadow-xl w-64`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 py-8 flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500">
            <img src="/assets/bee.png" alt="Bee Store" className="h-12 w-12" />
            <span className="ml-3 text-2xl font-bold text-white">
              Bee Store
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>

            <Link
              to="/dashboard/add-new-book"
              className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HiViewGridAdd className="w-6 h-6" />
              <span className="ml-3">Add Book</span>
            </Link>

            <Link
              to="/dashboard/manage-books"
              className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MdOutlineManageHistory className="w-6 h-6" />
              <span className="ml-3">Manage Books</span>
            </Link>

            <Link
              to="/dashboard/manage-orders"
              className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <TbBorderAll className="w-6 h-6" />
              <span className="ml-3">Manage Orders</span>
            </Link>

            <Link
              to="/dashboard/manage-contacts"
              className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LuContact className="w-6 h-6" />
              <span className="ml-3">Contacts</span>
            </Link>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <img
                src="/assets/admin.png"
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  Maram Dhambri
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={toggleDrawer} className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex-1 max-w-md ml-6">
              <div className="relative">
                <input
                  type="search"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                  placeholder="Search..."
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back to Bee Store management system
              </p>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
