"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";

export default function AddReview({ doctorId }: { doctorId: number }) {
    const {user} = useAuth();
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ doc_id: doctorId, rating, review, user_email:user?.email }),
                credentials:"include",
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            alert("Review added successfully!");
            setReview("");
            setRating(5);
        } catch (err) {
            setError("Error adding review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Add a Review</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        {[0,1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} ⭐</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Review:
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}
