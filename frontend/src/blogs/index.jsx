import { useState, useEffect, useCallback } from "react";
import { Calendar, User, Clock, Search, ChevronRight } from "lucide-react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { BlogsService } from "../api";
import { sampleBlogList, sampleCategories } from "./constant";
import { Link } from "react-router";

// Blogs Hero Section
const BlogsHero = () => {
  return (
    <section className="bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Blogs & Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest trends in AI, digital transformation, and
          workplace innovation. Expert insights, case studies, and practical
          guides for your business.
        </p>
      </div>
    </section>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer">
      {/* Featured Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        {blog.featured_image ? (
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">Featured Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
            {blog.category_name || "Uncategorized"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {blog.excerpt || blog.content?.substring(0, 150) + "..."}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(blog.created_at || blog.published_date)}</span>
          </div>
          {blog.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{blog.author}</span>
            </div>
          )}
          {blog.read_time && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{blog.read_time} min read</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <Link
          to={`/blogs/${blog.slug}`}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center group-hover:gap-2 transition-all"
        >
          Read More
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

// Loading Skeleton Component
const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

const BlogsContent = ({ activeCategory }) => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);

    const response = await BlogsService.getAllBlogs({
      params: {
        category: activeCategory !== "all" ? activeCategory : undefined,
        search: searchTerm || undefined,
      },
    });

    setBlogs(
      response ||
        sampleBlogList.filter((blog) => blog.category === activeCategory || activeCategory === "all")
    );
    setLoading(false);
  }, [activeCategory, searchTerm]);

  // Fetch blogs initially or when category changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fetchBlogs]);

  return (
    <section className="py-12 bg-gray-50">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const BlogsPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await BlogsService.getBlogCategories();
      setCategories(response || sampleCategories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogsHero />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <BlogsContent activeCategory={activeCategory} />
      <Footer />
    </div>
  );
};

export default BlogsPage;
