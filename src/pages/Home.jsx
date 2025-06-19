import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Search, TrendingUp, Star, Bookmark } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('https://node-backend-production-84ff.up.railway.app/api/blog');
                if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await res.json();
                setBlogs(data.blogs);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const categories = [
        { name: 'Technology', icon: <TrendingUp className="w-6 h-6" />, count: 12 },
        { name: 'Lifestyle', icon: <Star className="w-6 h-6" />, count: 8 },
        { name: 'Travel', icon: <Bookmark className="w-6 h-6" />, count: 15 },
        { name: 'Food', icon: <BookOpen className="w-6 h-6" />, count: 10 }
    ];

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredBlogs = filteredBlogs.slice(0, 3);

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

    return (
        <div className="min-h-screen bg-gray-50 mt-10">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Discover Stories, Ideas, and Expertise
                        </h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Join our community of writers and readers. Share your thoughts, learn from others,
                            and be part of something extraordinary.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/createblog"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Start Writing
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                to="/blog"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
                            >
                                Explore Blogs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search blogs..."
                        className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Featured Blogs Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stories</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our most popular and engaging blog posts from our community of writers.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBlogs.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blog/${blog._id}`}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.img || "https://flowbite.com/docs/images/blog/image-1.jpg"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {blog.desc}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{blog.author || "Anonymous"}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover content that matches your interests across various topics.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                            >
                                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                                <p className="text-gray-600">{category.count} articles</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-16 sm:px-12 lg:px-16">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Share Your Story?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join our community of writers and start sharing your thoughts with the world.
                            </p>
                            <Link
                                to="/createblog"
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors"
                            >
                                Start Writing Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;