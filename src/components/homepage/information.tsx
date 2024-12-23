

import styles from "@/components/homepage/informations.module.css";


export default function Informations() {
    // information about the web application
    return (
        <>
            <div className={`${styles.container} ${styles.bigtop}`}>
                <p className={styles.question}>What is Let's Surf?</p>
                <p>- Let's Surf is a website designed for surfers and people that want to do new experiences to discover and share the best places to surf worldwide.</p>
                <p className={styles.question}>Who is it made for?</p>
                <p>- It's perfect for everyone: beginner looking for their first destination and seasoned wave rider that want to try new spots.</p>
                <p className={styles.question}>What is our goal?</p>
                <p>- The goal of this website is to connect the surfing community thanks to spot guides, user review and personalized features</p>
            </div>
        </>
    );
} 