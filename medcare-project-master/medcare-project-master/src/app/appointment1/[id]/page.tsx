import AddReview from "@/app/components/layouts/AddReview/AddReview";
import styles from "./page.module.css";
import { cookies } from "next/headers";

type Doctor = {
    doc_id: number;
    name: string;
    gender: string;
    specification: string;
    experience: number;
    description: string;
    location: string;
    rating: number;
    degree: string;
    availability: Record<string, string[]>;
};

type Review = {
    review_id: number;
    user_email: string;
    rating: number;
    review: string;
};

export default async function DoctorProfile({ params }: { params: { id: string } }) {
    if (!params) {
        return <p>Invalid doctor ID</p>;
    }
    const { id } = await params;

    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/searchDoctor/${id}`, {
            headers: {
                Cookie: cookieHeader,
            },
            credentials: "include",
            cache: "no-store",
        });

        if (!response.ok) {
            return <p>Doctor not found</p>;
        }

        const { data } = await response.json();
        const doctor: Doctor = data as Doctor; // Explicitly asserting the type

        const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/all/${id}`, {
            headers: {
                Cookie: cookieHeader,
            },
            credentials: "include",
            cache: "no-store",
        });

        let reviews: Review[] = [];
        if (reviewResponse.ok) {
            const { data } = await reviewResponse.json();
            reviews = data;
        }

        return (
            <div className={styles.profileContainer}>
                <h1 className={styles.name}>{doctor.name}</h1>
                <p className={styles.specification}>{doctor.specification}</p>
                <p className={styles.description}>{doctor.description}</p>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}><strong>Experience:</strong> {doctor.experience} years</div>
                    <div className={styles.infoItem}><strong>Location:</strong> {doctor.location}</div>
                    <div className={styles.infoItem}><strong>Rating:</strong> ⭐ {doctor.rating}/5</div>
                    <div className={styles.infoItem}><strong>Degree:</strong> {doctor.degree}</div>
                </div>

                <h2>Availability</h2>
                <table className={styles.table}>
                    <thead>
                        <tr><th>Day</th><th>Time Slots</th></tr>
                    </thead>
                    <tbody>
                        {Object.entries(doctor.availability).map(([day, slots]) => (
                            <tr key={day}>
                                <td>{day}</td>
                                <td>{Array.isArray(slots) ? slots.join(", ") : "No slots available"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href={`/appointment1/${doctor.doc_id}/booking`} className={styles.bookButton}>
                    Book Appointment
                </a>

                <AddReview doctorId={parseInt(id)} />

                {reviews.length > 0 ? (
                    <div className={styles.reviewsSection}>
                        <h2>Patient Reviews</h2>
                        {reviews.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <p><strong>{review.user_email}</strong></p>
                                <p>⭐ {review.rating}/5</p>
                                <p>{review.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Doctor fetch error:", error);
        return <p>Doctor not found</p>;
    }
}
