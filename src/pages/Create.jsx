import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, User, Type, FileText, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        img: "",
        author: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Basic validation
        if (!formData.title.trim()) {
            setError("Title is required");
            setIsSubmitting(false);
            return;
        }

        if (!formData.desc.trim()) {
            setError("Description is required");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:4500/api/blog", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error('Failed to create blog');
            }

            // Show success message and redirect
          toast.success("Blog created successfully!");

// Delay navigation by 1.5 seconds (1500ms)
setTimeout(() => {
  navigate('/blog');
}, 1500);
        } catch (err) {
            setError(err.message || "Failed to create blog. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <>
      <Toaster/>
        <div className="min-h-screen bg-gray-50 py-12 mt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blogs
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
                    <p className="mt-2 text-gray-600">Share your thoughts and ideas with the world</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center">
                                    <Type className="w-4 h-4 mr-2" />
                                    Title
                                </div>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your blog title"
                            />
                        </div>

                        {/* Author Input */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    Author Name
                                </div>
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Featured Image
                                </div>
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                                <div className="space-y-1 text-center">
                                    {previewImage ? (
                                        <div className="relative">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="mx-auto h-32 w-auto object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewImage(null);
                                                    setFormData(prev => ({ ...prev, img: "" }));
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                    <span>Upload an image</span>
                                                    <input
                                                        id="image-upload"
                                                        name="image-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
                                <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Description
                                </div>
                            </label>
                            <textarea
                                id="desc"
                                name="desc"
                                rows={8}
                                value={formData.desc}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                placeholder="Write your blog content here..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    'Create Blog Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </>
    );
};

export default Create;