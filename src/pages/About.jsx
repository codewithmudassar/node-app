import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Globe, Sparkles, Heart, Shield, Zap } from 'lucide-react';

const About = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Rich Content Creation",
            description: "Create beautiful blog posts with our intuitive editor and rich formatting options."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Driven",
            description: "Join a vibrant community of writers and readers sharing their stories and insights."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Reach",
            description: "Share your thoughts with readers from around the world and build your audience."
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Modern Design",
            description: "Experience a clean, modern interface that makes reading and writing a pleasure."
        }
    ];

    const stats = [
        { label: "Active Writers", value: "1,000+" },
        { label: "Blog Posts", value: "5,000+" },
        { label: "Monthly Readers", value: "50,000+" },
        { label: "Countries", value: "100+" }
    ];

    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Passion for Writing",
            description: "We believe in the power of storytelling and the impact of well-crafted content."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Quality & Integrity",
            description: "We maintain high standards for content quality and author credibility."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Innovation",
            description: "We continuously evolve our platform to provide the best blogging experience."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-32">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blogs
                    </button>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Our Blog Platform
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            A modern platform for writers and readers to share stories, ideas, and insights with the world.
                            We're building a community where creativity thrives and knowledge flows freely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We've built a platform that empowers writers and engages readers with powerful features
                        and a beautiful experience.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-blue-600 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            These principles guide everything we do and shape our platform's future.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-colors"
                            >
                                <div className="text-blue-400 mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-16 sm:px-12 lg:px-16">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Start Your Blogging Journey?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join our community of writers and share your stories with the world.
                            </p>
                            <button
                                onClick={() => navigate('/create')}
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors"
                            >
                                Create Your First Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;