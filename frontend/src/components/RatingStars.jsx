import { Star, StarHalf } from "lucide-react"; // Importing Lucide icons

const RatingStars = ({ rating = 0 }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => {
        const fillPercentage = rating > 0 ? Math.min(Math.max((rating - i) * 100, 0), 100) : 0; // Ensures no fill when rating is 0

        return (
          <div key={i} className="relative w-4 h-6">
            {/* Empty Star (Outline version) */}
            <Star
              className="absolute w-full h-full text-white" // Outline, gray
              strokeWidth="1.5" // Slightly bolder stroke for outline effect
            />

            {/* Filled Star (Yellow) */}
            {fillPercentage > 0 && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  className="absolute w-full h-full text-white" // Filled, yellow
                  fill="currentColor"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars