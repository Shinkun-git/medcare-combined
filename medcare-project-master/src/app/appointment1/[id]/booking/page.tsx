"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import BookingBox from "@/app/components/layouts/BookingBox/BookingBox";
import Footer from "@/app/components/layouts/Footer/Footer";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect } from "react";

const BookingPage = () => {
    const { id } = useParams(); // Get doctor ID from the dynamic route
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return <p>Loading...</p>; // Prevents UI from rendering before authentication is determined
    }

    return (
        <>
            <main id={styles.container}>
                <section className={styles.section1}>
                    <article className={styles.title}>
                        <section className={styles.titleHead}>
                            Book Your Next Doctor Visit in Seconds.
                        </section>
                        <section className={styles.titleContent}>
                            CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.
                        </section>
                    </article>
                </section>

                <section className={styles.section2}>
                    <Image src={"/bookBG-crop.png"} alt={"doctor examining patient"} fill className={styles.backgroundImage} />
                    <div className={styles.bookBox}>
                        <BookingBox doctorId={id} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BookingPage;
