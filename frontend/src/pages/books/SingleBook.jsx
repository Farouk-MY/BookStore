import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    if(isLoading) return <div className="text-center text-xl text-gray-500">Loading...</div>;
    if(isError) return <div className="text-center text-xl text-red-500">Error loading book info</div>;

    return (
        <div className="max-w-5xl mx-auto shadow-xl bg-white p-8 rounded-xl border border-gray-200">
            <h1 className="text-4xl font-semibold text-center mb-8 text-indigo-700">{book.title}</h1>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Book Image */}
                <div className="w-full lg:w-1/3 shadow-xl rounded-lg overflow-hidden mb-6 lg:mb-0">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Book Details */}
                <div className="w-full lg:w-2/3 space-y-6">
                    <div className="text-lg text-gray-800">
                        <p className="font-semibold mb-2"><strong>Author:</strong> {book.author || 'Unknown'}</p>
                        <p className="mb-2"><strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}</p>
                        <p className="mb-2"><strong>Category:</strong> {book?.category}</p>
                    </div>

                    <div className="text-md text-gray-600">
                        <p className="font-semibold mb-2"><strong>Description:</strong></p>
                        <p>{book.description}</p>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={() => handleAddToCart(book)} 
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                    >
                        <FiShoppingCart className="text-xl" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SingleBook;
