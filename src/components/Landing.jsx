import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Landing() {
  return (
    <section className={styles.landingSection}>
      <div className={styles.date}>
        <p>FROM monday 10/07/23</p>
        <p>FROM sunday 24/07/23</p>
      </div>
      <h1 className={styles.landingHeading}>FOO FESTIVAL</h1>
      <div className={styles.landingButtons}>
        <Link href="/booking_display">
          <button>BUY TICKET</button>
        </Link>
        <button>THE FESTIVAL APP</button>
      </div>

      <p className={styles.landingQuote}>
        BRINGING <span className={styles.spanThe}>the</span>
        <span className={styles.bold}>NORSE MYTHOLOGY</span> <br /> BACK to LIFE
      </p>
    </section>
  );
}
