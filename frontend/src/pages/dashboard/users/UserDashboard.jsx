import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { BookOpen, Package, Calendar, DollarSign, Library, Loader2, AlertCircle } from "lucide-react";

const BeeStoreDashboard = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
        <p className="text-xl font-medium text-gray-700">Loading your literary journey...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl font-medium text-gray-700">Oops! Something went wrong.</p>
        <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  // Calculate dashboard stats
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalBooks = orders.reduce((sum, order) => sum + order.productIds.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {currentUser?.name || "Book Lover"}!</h1>
              <p className="text-amber-100 text-lg">Your literary hive of knowledge awaits</p>
            </div>
            <div className="hidden md:block">
              <Library className="w-16 h-16 text-amber-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Books Purchased</p>
                <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
              </div>
              <BookOpen className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
        
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-amber-600" />
                    <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {new Date(order?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-lg font-semibold text-amber-600">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-2">Purchased Books:</p>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {order.productIds.map((product, index) => (
                          <li key={product._id || `${order._id}-${index}`} className="flex items-center">
                            <BookOpen className="w-4 h-4 text-amber-600 mr-2" />
                            <span className="text-gray-700">
                              {product.title || `Book ID: ${product}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg text-center p-12">
            <Library className="w-16 h-16 text-amber-200 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">Your reading journey is about to begin!</p>
            <p className="text-gray-500">Explore our collection and make your first purchase.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Thank you for being part of our hive! <span className="font-bold">📚 BeeStore - Where Books Find Their Home 🐝</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BeeStoreDashboard;