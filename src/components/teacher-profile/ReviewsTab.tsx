import { ReviewsTab as SharedReviewsTab, ReviewItem } from "@/components/course-details/ReviewsTab";

interface TeacherReviewsTabProps {
  reviews?: ReviewItem[];
}

export function ReviewsTab({ reviews }: TeacherReviewsTabProps) {
  // We reuse the exact same ReviewsTab component from course-details,
  // as it provides the exact layout requested (rating summary + list).
  // The data source (aggregated across teacher courses) will be passed down via props.
  return <SharedReviewsTab reviews={reviews} />;
}
