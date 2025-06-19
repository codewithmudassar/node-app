import React, { useEffect, useState } from "react";
import { User, Calendar, Edit, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByName, setFilterByName] = useState({ title: "" });
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://node-backend-production-84ff.up.railway.app/api/blog/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Blog deleted successfully.");
        // Refresh blog list
        blogFetch();
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch (err) {
      toast.error("Error deleting blog.");
    }
  };

  const blogFetch = async () => {
    try {
      const res = await fetch(
        "https://node-backend-production-84ff.up.railway.app/api/blog"
      );
      const data = await res.json();
      setBlog(data.blogs);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blog data.");
    } finally {
      setIsLoading(false);
    }
  };
  const searchInputHandler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    blogFetch();
  }, []);

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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }
  const filteredBlogs = blog.filter((b) =>
    b.title.toLowerCase().includes(filterByName.title.toLowerCase())
  );

  return (
    <>
      <Toaster />
      <div className="bg-gray-50 min-h-screen mt-20">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to Our</span>
                <span className="block text-blue-600">Blog Collection</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Discover amazing stories, insights, and knowledge from our
                community of writers.
              </p>
            </div>
          </div>
        <div className="flex items-center  justify-end gap-3 mr-5 mb-5">
          <label htmlFor="search" className="text-sm font-medium text-blue-500">
            search by title:
          </label>
          <input
            type="search"
            name="title"
            value={filterByName.title}
            autoComplete="off"
            onChange={searchInputHandler}
            placeholder="Search ..."
            className="border border-blue-500 text-blue-500 rounded-md text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw]  focus:outline-none"
          />
        </div>
        </div>

        {/* Blog Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              >
                <a href={`/blog/${post._id}`} className="block relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      post.img ||
                      "https://flowbite.com/docs/images/blog/image-1.jpg"
                    }
                    alt={post.title}
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
                    New
                  </div>
                </a>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    <span>{post.author || "Anonymous"}</span>
                    <Calendar className="w-4 h-4 ml-4 mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <a href={`/blog/${post._id}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </a>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.desc || "No description available."}
                  </p>
                  <div className="flex items-center justify-between">
                    <a
                      href={`/blog/${post._id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={`/blog/update/${post._id}`}
                        className="text-gray-900 hover:text-red-500"
                      >
                        <Edit className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-gray-900 hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
