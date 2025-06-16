import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:4500/api/blog/${id}`);
        if (!res.ok) {
          throw new Error('Blog not found');
        }
        const data = await res.json();
        setBlog(data.blog);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog not found</h2>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Blog Image Background */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url(${blog.img || "https://flowbite.com/docs/images/blog/image-1.jpg"})`,
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm md:text-base">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <User className="w-5 h-5 mr-2" />
                <span>{blog.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black/30 backdrop-blur-sm rounded-lg hover:bg-black/50 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{blog.author || "Anonymous"}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Blog Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.desc || "No description available."}
            </p>
          </div>

          {/* Tags Section */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                Blog
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                Article
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                Story
              </span>
            </div>
          </div>

          {/* Share Section */}
          {/* <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div> */}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;