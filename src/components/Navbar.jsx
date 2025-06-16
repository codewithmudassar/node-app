import React, { useContext, useState } from "react";
import { CartContext } from "./Context";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0 ">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Blog Hub
            </span>
          </div>

          {/* Cart & Toggle */}
          <div className="flex items-center space-x-4">


            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-800 dark:text-white focus:outline-none"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-medium text-gray-800 dark:text-white">
            {["Home", "About", "Blog", "Create Blog"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
                  className="hover:text-blue-600 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Menu
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-200 font-medium">
            {["Home", "About", "Blogs", "Create Blog"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
                  className="block hover:text-blue-600 transition"
                  onClick={toggleSidebar}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
