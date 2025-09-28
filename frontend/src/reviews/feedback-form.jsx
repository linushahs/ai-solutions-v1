import { useState } from "react";
import { StarRating } from "./feedback-card";
import { Send } from "lucide-react";

const FeedbackForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    services: "",
    rating: 0,
    comments: "",
  });

  const [errors, setErrors] = useState({});

  const services = [
    "AI Virtual Assistant",
    "Rapid Prototyping",
    "Predictive Analytics",
    "Custom Development",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.comments.trim()) newErrors.comments = "Feedback is required";
    if (formData.rating === 0) newErrors.rating = "Please provide a rating";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Share Your Experience
      </h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-colors ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-colors"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Used
            </label>
            <select
              value={formData.services}
              onChange={(e) => handleInputChange("services", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-colors"
            >
              <option value="">Select a services</option>
              {services.map((services) => (
                <option key={services} value={services}>
                  {services}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-4">
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => handleInputChange("rating", rating)}
                size="lg"
              />
              <span className="text-sm text-gray-600">
                {formData.rating > 0 && `${formData.rating} out of 5 stars`}
              </span>
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback *
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-colors resize-vertical ${
                errors.comments ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Share your experience with our services..."
            />
            {errors.comments && (
              <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
