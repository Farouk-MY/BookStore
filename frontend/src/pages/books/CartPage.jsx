import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { Trash2, Book, ShoppingBag, ArrowRight } from "lucide-react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Your Reading List</h2>
          <p className="text-gray-600">Carefully curated books waiting to be discovered</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((product) => (
                  <div
                    key={product?._id}
                    className="group bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-amber-100"
                  >
                    <div className="flex space-x-6">
                      <div className="relative w-32 h-44">
                        <img
                          className="w-full h-full object-cover rounded-lg shadow-md transform transition-transform group-hover:scale-105"
                          src={getImgUrl(product?.coverImage)}
                          alt={product?.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {product?.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <Book className="w-4 h-4 text-amber-600" />
                            <span className="text-sm text-gray-600">
                              {product?.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-amber-600">
                            ${product?.newPrice}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(product)}
                            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <ShoppingBag className="w-16 h-16 text-amber-200 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  Your reading list is waiting to be filled with amazing books!
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-semibold text-gray-900">
                    ${totalPrice}
                  </span>
                </div>
                
                <div className="pb-4 text-sm text-gray-500">
                  Free shipping on orders over $35
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center w-full px-6 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors duration-200"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <Link 
                  to="/"
                  className="block text-center text-amber-600 hover:text-amber-700 font-medium"
                >
                  Continue Shopping
                </Link>

                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full px-6 py-3 text-gray-600 bg-gray-50 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;