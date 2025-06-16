import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Heart } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        alert('Thank you for subscribing to our newsletter!');
        setEmail('');
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Careers', path: '#' },
            { name: 'Blog', path: '/blog' },
            { name: 'Press', path: '#' }
        ],
        resources: [
            { name: 'Documentation', path: '#' },
            { name: 'Help Center', path: '#' },
            { name: 'Guides', path: '#' },
            { name: 'API Status', path: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms of Service', path: '#' },
            { name: 'Cookie Policy', path: '#' },
            { name: 'GDPR', path: '#' }
        ]
    };

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, url: '#', label: 'Facebook' },
        { icon: <Twitter className="w-5 h-5" />, url: '#', label: 'Twitter' },
        { icon: <Instagram className="w-5 h-5" />, url: '#', label: 'Instagram' },
        { icon: <Linkedin className="w-5 h-5" />, url: '#', label: 'LinkedIn' }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <h2 className="text-2xl font-bold text-white">Blog Hub</h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering writers and readers to share stories, ideas, and insights with the world.
                            Join our vibrant community today.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <a href="mailto:contact@bloghub.com" className="hover:text-white transition-colors">
                                        contact@bloghub.com
                                    </a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                    <a href="tel:+1234567890" className="hover:text-white transition-colors">
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    <span>123 Blog Street, Digital City, 12345</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            © {currentYear} BlogHub. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            {footerLinks.legal.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by BlogHub Team
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;