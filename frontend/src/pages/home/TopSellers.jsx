import React, { useState } from "react";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import BookCard from "../books/BookCard";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [] } = useFetchAllBooksQuery();

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category &&
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div id="shop" className="pt-3">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto px-4 mt-4 py-8">
          {/* Category Heading with Line and Image */}
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-cinzel mr-4 text-yellow-500">Shop</h1>
            <div className="flex-grow h-[2px] bg-gray-400"></div>
            <img
              src="assets/beeR.png"
              alt="Description"
              className="w-16 h-16 object-cover ml-0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar (smaller width) */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg shadow-sm cursor-pointer transition-colors ${
                      selectedCategory === category
                        ? "bg-yellow-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              {/* New Categories Content */}
              <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                <h2 className="text-xl font-bold mb-4">New Categories</h2>
                {/* Add new categories dynamically if needed */}
                <div className="flex justify-between items-center py-2">
                  <span>Fiction</span>
                  <span className="bg-yellow-600 px-2 py-1 rounded-full text-sm">
                    10
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Non-Fiction</span>
                  <span className="bg-yellow-600 px-2 py-1 rounded-full text-sm">
                    5
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Science</span>
                  <span className="bg-yellow-600 px-2 py-1 rounded-full text-sm">
                    8
                  </span>
                </div>
              </div>
            </div>

            {/* Center Content (takes remaining width) */}
            <div className="lg:col-span-10">
              <h1 className="text-2xl font-bold mb-6">Featured Books</h1>
              {/* Books displayed in a grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <div key={index} className="flex justify-center">
                      <BookCard book={book} className="w-48" />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No books available in this category.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
