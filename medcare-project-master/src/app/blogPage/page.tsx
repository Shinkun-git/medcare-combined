import styles from "./page.module.css";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
    subsets: [],
    weight: "500",
});

export default function EmergencyContacts() {
  return (
    <main className={`${styles.container} ${MontserratFont.className}`}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Emergency Contacts</h1>
        <p className={styles.subtitle}>Important emergency numbers for quick access</p>
      </div>
      
      <div className={styles.contactList}>
        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🚔</span>
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Police</h2>
            <p className={styles.contactNumber}>📞 100</p>
            <p className={styles.description}>24/7 Emergency Police Assistance</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🚑</span>
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Ambulance</h2>
            <p className={styles.contactNumber}>📞 102</p>
            <p className={styles.description}>Emergency Medical Services</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🚒</span>
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Fire Brigade</h2>
            <p className={styles.contactNumber}>📞 101</p>
            <p className={styles.description}>Fire Emergency Services</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🌪️</span>
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Disaster Helpline</h2>
            <p className={styles.contactNumber}>📞 108</p>
            <p className={styles.description}>Natural Disaster Emergency Response</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>👩</span>
          </div>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Women Helpline</h2>
            <p className={styles.contactNumber}>📞 1091</p>
            <p className={styles.description}>24/7 Women's Emergency Support</p>
          </div>
        </div>
      </div>
    </main>
  );
}
