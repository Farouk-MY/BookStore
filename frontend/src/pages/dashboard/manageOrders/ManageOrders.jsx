import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  File, 
  Trash2, 
  Eye, 
  Printer, 
  RefreshCw, 
  BookOpen, 
  UserCircle2, 
  ShoppingCart, 
  Calendar, 
  Phone,
  MapPin
} from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import getBaseUrl from '../../../utils/baseURL';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/orders/order`);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${getBaseUrl()}/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
      setError('Failed to delete order');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  const generatePDF = async (order = null) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, fontSize = 12) => {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // Header
    page.drawText('BeeStore Order Invoice', {
      x: 50,
      y: height - 50,
      size: 20,
      font,
      color: rgb(0.2, 0.4, 0.6),
    });

    const ordersToExport = order ? [order] : orders;

    let yPosition = height - 100;
    ordersToExport.forEach((order) => {
      drawText(`Order #${order._id}`, 50, yPosition, 14);
      yPosition -= 30;
      drawText(`Customer: ${order.name}`, 50, yPosition);
      yPosition -= 20;
      drawText(`Email: ${order.email}`, 50, yPosition);
      yPosition -= 20;
      drawText(`Phone: ${order.phone}`, 50, yPosition);
      yPosition -= 20;
      drawText(
        `Address: ${order.address.city}, ${order.address.state || ''}, ${order.address.country || ''}`,
        50,
        yPosition
      );
      yPosition -= 20;
      drawText(`Zip Code: ${order.address.zipcode || 'N/A'}`, 50, yPosition);
      yPosition -= 20;
      drawText(`Total Price: $${order.totalPrice.toFixed(2)}`, 50, yPosition);
      yPosition -= 20;
      drawText(`Order Date: ${formatDate(order.createdAt)}`, 50, yPosition);

      yPosition -= 30;
      drawText('Products:', 50, yPosition, 13);
      yPosition -= 20;

      order.productIds.forEach((product) => {
        drawText(`• ${product.title} by ${product.author}`, 70, yPosition);
        yPosition -= 20;
        drawText(`  Price: $${product.newPrice.toFixed(2)}`, 70, yPosition);
        yPosition -= 20;
      });

      yPosition -= 30;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = order
      ? `beeStore_order_${order._id}.pdf`
      : 'beeStore_all_orders.pdf';
    link.click();
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <RefreshCw className="mx-auto mb-4 animate-spin text-yellow-500" size={48} />
        <p className="text-gray-600">Loading orders...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {error}
    </div>
  );

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50">
        <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-600 mb-4">No orders found</p>
        <button 
          onClick={fetchOrders} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          <RefreshCw className="inline mr-2" size={16} /> Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <ShoppingCart className="mr-3 text-yellow-500" size={36} />
          Manage Orders
        </h1>
        <button 
          onClick={() => generatePDF()} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Printer className="mr-2" size={16} /> Export All PDFs
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-right">Total Price</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3 text-sm text-gray-600">{order._id}</td>
                <td className="px-4 py-3 flex items-center">
                  <UserCircle2 className="mr-2 text-yellow-400" size={24} />
                  {order.name}
                </td>
                <td className="px-4 py-3">{order.email}</td>
                <td className="px-4 py-3 text-right font-bold text-yellow-600">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <Calendar className="inline mr-2 text-gray-400" size={16} />
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="text-blue-500 hover:text-yellow-700 mr-2"
                    title="View Order"
                  >
                    <Eye size={20} />
                  </button>
                  <button 
                    onClick={() => generatePDF(order)} 
                    className="text-green-500 hover:text-yellow-700 mr-2"
                    title="Export PDF"
                  >
                    <File size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order._id)} 
                    className="text-red-500 hover:text-red-700"
                    title="Delete Order"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <button 
                onClick={() => generatePDF(selectedOrder)} 
                className="text-yellow-500 hover:text-yellow-700"
                title="Export PDF"
              >
                <Printer size={24} />
              </button>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <UserCircle2 className="mr-2 text-yellow-400" size={20} />
                <strong>Customer Name:</strong> {selectedOrder.name}
              </p>
              <p className="flex items-center">
                <UserCircle2 className="mr-2 text-yellow-400" size={20} />
                <strong>Email:</strong> {selectedOrder.email}
              </p>
              <p className="flex items-center">
                <Phone  className="mr-2 text-yellow-400" size={20} />
                <strong>Phone:</strong> {selectedOrder.phone}
              </p>
              <p className="flex items-center">
                <MapPin  className="mr-2 text-yellow-400" size={20} />
                <strong>Adresse: </strong> {`${selectedOrder.address.city}, ${selectedOrder.address.country} - ${selectedOrder.address.zipcode}`}
              </p>
              <p className="flex items-center">
                <ShoppingCart className="mr-2 text-yellow-400" size={20} />
                <strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}
              </p>
              <div>
                <p className="font-bold mb-2">Products Ordered:</p>
                <ul className="space-y-2">
                  {selectedOrder.productIds.map((product) => (
                    <li key={product._id} className="bg-gray-100 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>{product.title}</strong>
                          <p className="text-sm text-gray-600">Author: {product.author}</p>
                        </div>
                        <span className="text-yellow-600 font-bold">
                          ${product.newPrice.toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)} 
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;