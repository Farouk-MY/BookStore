import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { Printer, BookOpen, BookMarked } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  const generatePDF = async (order) => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const { width, height } = page.getSize();

      // Embed fonts
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Helper function for drawing text
      const drawText = (text, { x, y, size = 12, font = helveticaFont, color = rgb(0, 0, 0) }) => {
        page.drawText(text, {
          x,
          y,
          size,
          font,
          color,
        });
      };

      // Background
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(1, 0.98, 0.9),
      });

      // Header
      drawText("BeeStore - Your Literary Hive", {
        x: 50,
        y: height - 50,
        size: 30,
        font: helveticaBoldFont,
        color: rgb(0.8, 0.5, 0),
      });

      // Decorative lines
      page.drawLine({
        start: { x: 50, y: height - 70 },
        end: { x: width - 50, y: height - 70 },
        thickness: 2,
        color: rgb(0.8, 0.5, 0),
      });

      // Order details
      const startY = height - 120;
      const lineHeight = 25;

      drawText("Order Details", {
        x: 50,
        y: startY,
        size: 20,
        font: helveticaBoldFont,
        color: rgb(0.3, 0.3, 0.3),
      });

      const details = [
        `Order ID: ${order._id}`,
        `Customer: ${order.name}`,
        `Email: ${order.email}`,
        `Phone: ${order.phone}`,
        `Total Amount: $${order.totalPrice}`,
        "",
        "Shipping Address:",
        `${order.address.city}, ${order.address.state}`,
        `${order.address.country}, ${order.address.zipcode}`,
        "",
        "Ordered Books:",
      ];

      details.forEach((detail, index) => {
        const isHeader = detail === "Shipping Address:" || detail === "Ordered Books:";
        drawText(detail, {
          x: 50,
          y: startY - (lineHeight * (index + 2)),
          size: isHeader ? 14 : 12,
          font: isHeader ? helveticaBoldFont : helveticaFont,
          color: rgb(0.2, 0.2, 0.2),
        });
      });

      // Books list
      const booksStartY = startY - (lineHeight * (details.length + 2));
      order.productIds.forEach((product, index) => {
        const bookTitle = typeof product === 'object' ? product.title : `Book ${index + 1}`;
        drawText(`• ${bookTitle}`, {
          x: 70,
          y: booksStartY - (lineHeight * index),
          size: 12,
          color: rgb(0.3, 0.3, 0.3),
        });
      });

      // Footer
      drawText("Thank you for shopping at BeeStore!", {
        x: 50,
        y: 50,
        size: 12,
        font: helveticaBoldFont,
        color: rgb(0.8, 0.5, 0),
      });

      // Generate PDF file
      const pdfBytes = await pdfDoc.save();
      
      // Create blob and trigger download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BeeStore-Order-${order._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    }
  };

  // Rest of the component remains the same...
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-100 to-yellow-200">
        <div className="flex items-center space-x-4">
          <BookOpen className="animate-bounce text-amber-600" size={48} />
          <span className="text-2xl text-amber-700">
            Loading your literary journey...
          </span>
        </div>
      </div>
    );

  if (isError)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        Oops! Our bookshelf is experiencing turbulence.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-serif text-center text-amber-800 mb-12 flex justify-center items-center">
          <BookMarked className="mr-4 text-amber-600" />
          BeeStore Reading Collection
          <BookMarked className="ml-4 text-amber-600" />
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600 text-xl bg-white shadow-lg rounded-xl p-12">
            <BookOpen className="mx-auto mb-4 text-amber-500" size={64} />
            No books have landed in your cart yet. Start your reading adventure!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl border-2 border-amber-100"
              >
                <div className="p-6 bg-amber-50">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-serif text-amber-700">
                      Order #{index + 1}
                    </h2>
                    <button
                      onClick={() => generatePDF(order)}
                      className="bg-amber-500 text-white p-3 rounded-full hover:bg-amber-600 transition-colors shadow-md"
                      title="Download Order Receipt"
                    >
                      <Printer size={24} />
                    </button>
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center">
                      <BookMarked className="mr-2 text-amber-500" size={20} />
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="flex items-center">
                      <BookOpen className="mr-2 text-amber-500" size={20} />
                      <strong>Total Price:</strong> ${order.totalPrice}
                    </p>
                    <p className="flex items-center">
                      <BookMarked className="mr-2 text-amber-500" size={20} />
                      <strong>Delivery:</strong> {order.address.city},{" "}
                      {order.address.state}
                    </p>
                  </div>

                  <div className="mt-6 bg-white p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-serif text-amber-600 mb-3">
                      Your Bookshelf
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {order.productIds.map((product, bookIndex) => (
                        <div
                          key={typeof product === 'object' ? product._id : product}
                          className="bg-amber-100 px-3 py-2 rounded-md flex items-center"
                        >
                          <BookOpen className="mr-2 text-amber-600" size={16} />
                          {typeof product === 'object' ? product.title : `Book ${bookIndex + 1}: ${product}`}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;