import { Filter, Search, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import FeedbackCard from "./feedback-card";
import FeedbackForm from "./feedback-form";
import toast from "react-hot-toast";
import { ReviewService } from "../api";

const ReviewsPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const services = [
    "AI Virtual Assistant",
    "Rapid Prototyping",
    "Predictive Analytics",
    "Custom Development",
  ];

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await ReviewService.getAllReviews({});

      if (response?.data) {
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again.");
      setFeedbacks([]);
      setFilteredFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchReviewsWithParams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {};

      if (ratingFilter !== "all") {
        params.rating = ratingFilter;
      }

      if (serviceFilter !== "all") {
        params.services = serviceFilter;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await ReviewService.getAllReviews({ params });

      if (response?.data) {
        setFilteredFeedbacks(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again.");
      setFilteredFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  }, [ratingFilter, serviceFilter, searchTerm]);

  const handleSubmitFeedback = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await ReviewService.createReview(formData);

      toast.success("Thank you for your feedback!");
      // Refresh reviews with current filters to show the new review
      await fetchReviews();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(
        "Sorry, there was an error submitting your feedback. Please try again."
      );
      toast.error(
        "Sorry, there was an error submitting your feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;

    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (total / feedbacks.length).toFixed(1);
  };

  const calculateSatisfactionRate = () => {
    if (feedbacks.length === 0) return 0;

    const satisfiedReviews = feedbacks.filter(
      (feedback) => feedback.rating >= 4
    ).length;
    return Math.round((satisfiedReviews / feedbacks.length) * 100);
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    fetchReviewsWithParams();
  }, [searchTerm, ratingFilter, serviceFilter, fetchReviewsWithParams]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchReviews}
              className="text-red-600 hover:text-red-800 underline mt-2"
            >
              Try again
            </button>
          </div>
        )}

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
                  {calculateAverageRating()}
                </span>
                <Star className="text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-3xl font-bold text-gray-900">
                {calculateSatisfactionRate()}%
              </div>
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
              services={services}
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
                  <FeedbackCard
                    key={feedback.id}
                    feedback={{
                      ...feedback,
                      services: feedback.services,
                      comments: feedback.comments,
                      createdAt: feedback.created_at,
                    }}
                  />
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
                    {isLoading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading reviews...</p>
                      </div>
                    ) : feedbacks.length === 0 ? (
                      "Be the first to leave a review!"
                    ) : (
                      "No reviews match your current filters"
                    )}
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
