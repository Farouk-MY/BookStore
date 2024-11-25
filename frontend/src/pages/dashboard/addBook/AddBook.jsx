import React, { useState } from "react";
import { BookPlus, Upload, Hexagon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "trending") {
          formData.append(key, data[key] || false);
        } else {
          formData.append(key, data[key]);
        }
      });

      if (imageFile) {
        formData.append("coverImage", imageFile);
      }

      await addBook(formData).unwrap();

      Swal.fire({
        title: "Book Buzz!",
        text: "Your book is now part of the BeeStore hive!",
        icon: "success",
        background: '#F6F1E5',
        confirmButtonColor: "#FFD700",
      });

      reset();
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Let's try again.",
        icon: "error",
        background: '#FFF0E5',
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E5] flex items-center justify-center p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Decorative Hexagon Background */}
        <div className="absolute top-0 right-0 opacity-10">
          <Hexagon size={300} className="text-yellow-400" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 relative z-10">
          <div className="flex items-center justify-center space-x-4">
            <BookPlus size={40} />
            <h2 className="text-4xl font-extrabold">Add New Book</h2>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 relative z-20">
          {/* Book Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="relative">
              <input 
                {...register("title", { required: true })}
                placeholder="Book Title" 
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
              {errors.title && <span className="text-red-500 absolute -bottom-5 text-xs">Title is required</span>}
            </div>

            {/* Author */}
            <div className="relative">
              <input 
                {...register("author", { required: true })}
                placeholder="Author Name" 
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
              {errors.author && <span className="text-red-500 absolute -bottom-5 text-xs">Author is required</span>}
            </div>
          </div>

          {/* Description */}
          <textarea 
            {...register("description", { required: true })}
            placeholder="Book Description" 
            rows={4}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          {/* Category and Pricing */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Category Select */}
            <select 
              {...register("category", { required: true })}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            >
              <option value="">Select Category</option>
              <option value="Business">Business</option>
              <option value="Horror">Horror</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Fiction">Fiction</option>
            </select>

            {/* Old Price */}
            <div className="relative">
              <input 
                type="number"
                {...register("oldPrice", { required: true })}
                placeholder="Old Price" 
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
            </div>

            {/* New Price */}
            <div className="relative">
              <input 
                type="number"
                {...register("newPrice", { required: true })}
                placeholder="New Price" 
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" 
              id="bookCover"
            />
            <label 
              htmlFor="bookCover" 
              className="flex flex-col items-center justify-center cursor-pointer space-y-2"
            >
              <Upload size={40} className="text-yellow-600" />
              <span className="text-gray-600">
                {imagePreview ? "Change Cover" : "Upload Book Cover"}
              </span>
            </label>

            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Book Cover Preview" 
                className="mt-4 max-h-48 rounded-xl shadow-md"
              />
            )}
          </div>

          {/* Trending Checkbox */}
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox"
              {...register("trending")}
              className="rounded text-yellow-600 focus:ring-2 focus:ring-yellow-500"
            />
            <span>Mark as Trending</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Adding Book..." : "Add to BeeStore"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;