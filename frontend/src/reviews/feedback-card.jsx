import { Star, User } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

// Star Rating Component
export const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={twMerge(
            "cursor-pointer transition-colors",
            sizeClasses[size],
            star <= (hoverRating || rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-400",
            readonly ? "cursor-default" : ""
          )}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const FeedbackCard = ({ feedback }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
            <p className="text-sm text-gray-500">{feedback.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <StarRating rating={feedback.rating} readonly size="sm" />
          <span className="text-xs text-gray-500 mt-1">
            {formatDate(feedback.createdAt)}
          </span>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{feedback.comments}</p>

      {feedback.service && (
        <div className="mt-4">
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {feedback.services}
          </span>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
