import styles from "./page.module.css";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
    subsets: [],
    weight: "500",
});

type Review = {
    review_id: number;
    user_email: string;
    rating: number;
    review: string;
};

export default async function ReviewsPage() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/all`, {
            headers: { Cookie: cookieHeader },
            credentials: "include",
            cache: "no-store",
        });

        if (!response.ok) {
            return (
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <p className={styles.errorMessage}>Reviews not found</p>
                </div>
            );
        }

        const { data } = await response.json();
        const reviews: Review[] = data;

        return (
            <main className={`${styles.reviewPage} ${MontserratFont.className}`}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Patient Reviews</h1>
                    <p className={styles.subtitle}>Read what our patients have to say about their experiences</p>
                </div>

                {reviews.length > 0 ? (
                    <div className={styles.reviewList}>
                        {reviews.map((review) => (
                            <div key={review.review_id} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userIcon}>👤</div>
                                        <p className={styles.userEmail}>{review.user_email}</p>
                                    </div>
                                    <div className={styles.ratingContainer}>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, index) => (
                                                <span 
                                                    key={index} 
                                                    className={`${styles.star} ${index < review.rating ? styles.filled : ''}`}
                                                >
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                        <p className={styles.ratingText}>{review.rating}/5</p>
                                    </div>
                                </div>
                                <div className={styles.reviewContent}>
                                    <p className={styles.reviewText}>{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noReviewsContainer}>
                        <div className={styles.noReviewsIcon}>📝</div>
                        <p className={styles.noReviews}>No reviews available yet.</p>
                        <p className={styles.noReviewsSubtext}>Be the first to share your experience!</p>
                    </div>
                )}
            </main>
        );
    } catch (error) {
        console.error("Reviews fetch error:", error);
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>❌</div>
                <p className={styles.errorMessage}>Failed to fetch reviews</p>
                <p className={styles.errorSubtext}>Please try again later</p>
            </div>
        );
    }
}
