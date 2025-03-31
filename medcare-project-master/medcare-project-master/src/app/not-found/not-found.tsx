import styles from "./not-found.module.css";

export default function NotFoundPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Page Not Found</h1>
            <p className={styles.text}>Sorry, the page you're looking for doesn't exist.</p>
            <a href="/" className={styles.button}>Go Home</a>
        </div>
    );
}
