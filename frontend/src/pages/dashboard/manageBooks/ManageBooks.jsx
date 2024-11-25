import React, { useState, useRef } from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Trash2, 
  Edit2, 
  Search, 
  SlidersHorizontal, 
  PlusCircle, 
  ChevronDown,
  Download,
  Printer,
  Filter,
  FileText,
  Table as TableIcon
} from 'lucide-react';

const ManageBooks = () => {
    const navigate = useNavigate();
    const {data: books, refetch} = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const tableRef = useRef(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    const categories = ['All', 'Fiction', 'Horror', 'Science', 'History',"Business", 'Technology'];
    
    const filteredBooks = books?.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || book.category === selectedCategory)
    );

    // Function to format date
    const formatDate = () => {
        const date = new Date();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Function to generate CSV content
    const generateCSV = () => {
        const headers = ['Title', 'Category', 'Price', 'ID'];
        const rows = filteredBooks.map(book => [
            book.title,
            book.category,
            `$${book.newPrice}`,
            book._id
        ]);
        
        return [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
    };

    // Function to download CSV
    const downloadCSV = () => {
        const csv = generateCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `books-list-${formatDate()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    // Function to print table
    const handlePrint = () => {
        const printContent = document.getElementById('print-area');
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = `
            <div style="padding: 20px;">
                <h1 style="text-align: center; margin-bottom: 20px;">Books List - ${formatDate()}</h1>
                ${printContent.innerHTML}
            </div>
        `;

        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const ExportMenu = () => (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#F6F1E5] ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
                <button
                    onClick={() => {
                        downloadCSV();
                        setShowExportMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                    <TableIcon className="h-4 w-4 mr-2" />
                    Export as CSV
                </button>
                <button
                    onClick={() => {
                        handlePrint();
                        setShowExportMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                    <Printer className="h-4 w-4 mr-2" />
                    Print List
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-yellow-500 rounded-xl">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Book Management</h1>
                                <p className="text-sm text-gray-500">Manage your book inventory efficiently</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={handlePrint}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </button>
                            <div className="relative">
                                <button 
                                    onClick={() => setShowExportMenu(!showExportMenu)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                </button>
                                {showExportMenu && <ExportMenu />}
                            </div>
                            <Link
                                to="/dashboard/add-new-book"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add New Book
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Search and Filter Section */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                        placeholder="Search books..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto" id="print-area" ref={tableRef}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>#</span>
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>Book Details</span>
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>Category</span>
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>Price</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:hidden">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBooks?.map((book, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            #{index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                                        <BookOpen className="h-6 w-6 text-yellow-500" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                    <div className="text-sm text-gray-500">ID: {book._id?.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                {book.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">${book.newPrice}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium print:hidden">
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    to={`/dashboard/edit-book/${book._id}`}
                                                    className="flex items-center text-yellow-500 hover:text-yellow-900 transition-colors duration-200"
                                                >
                                                    <Edit2 className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="flex items-center text-red-600 hover:text-red-900 transition-colors duration-200"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">{filteredBooks?.length || 0}</span> books
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;