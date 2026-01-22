import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";

interface Props {
  className?: string;
  showReviewCount?: boolean;
  size?: "sm" | "md" | "lg";
}

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

function AppStoreRating({ className = "", showReviewCount = true, size = "md" }: Props) {
  const config = useContext(ConfigContext);
  const appStore = config?.appStore;

  // Don't render if no rating data or rating is 0
  if (!appStore || appStore.rating === 0 || appStore.ratingCount === 0) {
    return null;
  }

  const { rating, ratingCount } = appStore;

  // Size classes
  const sizeClasses = {
    sm: {
      container: "gap-1 px-2 py-1",
      star: "w-3 h-3",
      rating: "text-xs",
      count: "text-xs",
    },
    md: {
      container: "gap-1.5 px-3 py-1.5",
      star: "w-4 h-4",
      rating: "text-sm font-semibold",
      count: "text-sm",
    },
    lg: {
      container: "gap-2 px-4 py-2",
      star: "w-5 h-5",
      rating: "text-base font-semibold",
      count: "text-base",
    },
  };

  const styles = sizeClasses[size];

  // Calculate full and partial stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`inline-flex items-center ${styles.container} rounded-full bg-base-200/80 backdrop-blur-sm border border-base-300 ${className}`}
    >
      {/* Stars */}
      <div className="flex items-center text-warning">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} filled={true} className={styles.star} />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <StarIcon filled={false} className={`${styles.star} text-base-content/30`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon filled={true} className={styles.star} />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon key={`empty-${i}`} filled={false} className={`${styles.star} text-base-content/30`} />
        ))}
      </div>

      {/* Rating number */}
      <span className={`${styles.rating} text-base-content`}>
        {rating.toFixed(1)}
      </span>

      {/* Review count */}
      {showReviewCount && ratingCount > 0 && (
        <span className={`${styles.count} text-base-content/60`}>
          ({ratingCount.toLocaleString()} {ratingCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </motion.div>
  );
}

export default AppStoreRating;
