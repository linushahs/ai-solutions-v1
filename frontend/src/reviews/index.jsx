import { Filter, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import FeedbackCard from "./feedback-card";
import FeedbackForm from "./feedback-form";

const ReviewsPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  // Mock data - replace with API calls
  useEffect(() => {
    const mockFeedbacks = [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        company: "TechCorp Solutions",
        service: "AI Virtual Assistant",
        rating: 5,
        message:
          "Absolutely fantastic service! The AI virtual assistant has transformed our customer support operations. The implementation was smooth and the results exceeded our expectations.",
        createdAt: "2024-09-20T10:30:00Z",
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "m.chen@innovate.co",
        company: "Innovate Co",
        service: "Predictive Analytics",
        rating: 4,
        message:
          "Great predictive analytics solution. The insights have helped us make better business decisions. Minor issues with the dashboard, but overall very satisfied.",
        createdAt: "2024-09-18T14:15:00Z",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily@startup.io",
        company: "StartupHub",
        service: "Rapid Prototyping",
        rating: 5,
        message:
          "The rapid prototyping service is incredible! They delivered our MVP in record time with excellent quality. Highly recommend for any startup looking to move fast.",
        createdAt: "2024-09-15T09:45:00Z",
      },
    ];

    setFeedbacks(mockFeedbacks);
    setFilteredFeedbacks(mockFeedbacks);
  }, []);

  // Filter feedbacks based on search and filters
  useEffect(() => {
    let filtered = feedbacks;

    if (searchTerm) {
      filtered = filtered.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== "all") {
      filtered = filtered.filter(
        (feedback) => feedback.rating === parseInt(ratingFilter)
      );
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter(
        (feedback) => feedback.service === serviceFilter
      );
    }

    setFilteredFeedbacks(filtered);
  }, [feedbacks, searchTerm, ratingFilter, serviceFilter]);

  const handleSubmitFeedback = async (formData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newFeedback = {
        id: feedbacks.length + 1,
        ...formData,
        createdAt: new Date().toISOString(),
      };

      setFeedbacks((prev) => [newFeedback, ...prev]);

      // Show success message (you can implement a toast notification here)
      alert("Thank you for your feedback! It has been submitted successfully.");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "Sorry, there was an error submitting your feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
          feedbacks.length
        ).toFixed(1)
      : 0;

  const services = [
    "AI Virtual Assistant",
    "Rapid Prototyping",
    "Predictive Analytics",
    "Custom Development",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Feedback & Reviews
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            See what our clients are saying and share your own experience
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-3xl font-bold text-gray-900">
                {feedbacks.length}
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {averageRating}
                </span>
                <Star className="text-yellow-400 fill-yellow-400"/>
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <FeedbackForm
              onSubmit={handleSubmitFeedback}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Feedbacks List */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
                  >
                    <option value="all">All Services</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Feedbacks */}
            <div className="space-y-6">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Filter className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No reviews found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
