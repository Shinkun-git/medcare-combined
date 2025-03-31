import styles from "./Footer.module.css"
import Image from "next/image"
import { Montserrat } from "next/font/google"
import Link from "next/link"
const MontserratFont = Montserrat({
    subsets:[],
    weight:"500"
  })
const Footer = () => {

    return (
        <footer className={styles.footer}>
            <section className={`${styles.footSection} ${MontserratFont.className}`}>
                <span className={styles.copyright}>© EmScripts 2024. All Right Reserved.</span>
                <section className={styles.contacts}>
                    <div>
                        <Link href={`/call`}>
                        <Image src="/call-vector.png" alt="call" width={20} height={20}/>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/whatsapp`}>
                        <Image src="/whtsapp-vector.png" alt="whatsapp" width={20} height={20}/>
                        </Link>
                    </div>
                </section>
            </section>
        </footer>
    );
}

export default Footer;