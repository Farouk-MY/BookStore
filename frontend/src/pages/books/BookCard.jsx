import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

// Placeholder image path (directly in public)
const placeholderImage = "/placeholder.png";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.coverImage ? getImgUrl(book.coverImage) : placeholderImage}
          alt={book.title || "No Title"}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      </Link>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {book.title || "Untitled"}
      </h3>
      <p className="text-gray-600 mb-2 line-clamp-1">
        <strong>Author:</strong> {book.author || "Unknown"}
      </p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-yellow-600 font-bold">
          ${book.newPrice || "N/A"}
        </span>
        {book.oldPrice && (
          <span className="text-gray-500 line-through">${book.oldPrice}</span>
        )}
      </div>
      <button
        onClick={() => handleAddToCart(book)}
        className="w-full bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-700 transition"
      >
        <FiShoppingCart />
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
