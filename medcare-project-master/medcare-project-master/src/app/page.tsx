import { Montserrat } from "next/font/google"
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"

const MontserratFont = Montserrat({
    subsets: [],
    weight: "500"
})

export default function LandingPage() {
    return (
        <main className={styles.main}>
            <section className={styles.section1}>
                <section className={`${styles.titleBox} ${MontserratFont.className}`}>
                    <article className={styles.titleHead}>
                        <p>
                            Health in Your Hands.
                        </p>
                    </article>
                    <article className={styles.titleContent}>
                        <p>
                            Take control of your healthcare with CareMate. Book
                            appointments with ease, explore health blogs,
                            and stay on top of your well-being, all in one place.
                        </p>
                    </article>
                </section>
                <section className={`${styles.searchField} ${MontserratFont.className}`}>
                    <div className={styles.searchDetails}>
                        <Link href={"/appointment1"} >
                        <button>Get Started</button>
                        </Link>
                    </div>
                </section>
            </section>
            <section className={styles.section2}>
                <div className={styles.heroImg}>
                    <Image src="/landingImage-cropped.jpg" alt="doctor examining patient"
                        fill />
                </div>
            </section>
        </main>
    )
}