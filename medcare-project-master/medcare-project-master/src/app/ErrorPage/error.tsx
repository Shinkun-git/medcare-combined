"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./error.module.css";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error("Error caught:", error);
    }, [error]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Oops! Something went wrong.</h1>
            <p className={styles.text}>We couldn't find the page you're looking for.</p>
            <button className={styles.button} onClick={() => router.push("/")}>
                Go Home
            </button>
        </div>
    );
}
