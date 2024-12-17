'use client';

import { useState } from 'react';
import styles from "@/components/homepage/informations.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function Functionalities() {
    const { data: session, status } = useSession();

    return (
        <>
            <div className={`${styles.functionalities}`}>
                Functionalities:
            </div>
            <div className={styles.container}>
                <Link className={styles.nope} href={`/uploadSurfSpot`}>
                    <div className={`${styles.place} ${styles.section}`} >
                        <div className={styles.left_section}>
                            <i className={`bi bi-plus-circle ${styles.icon}`}></i> Add a new Place
                        </div>
                        <div className={styles.right_section}>
                            Add a place that you have discover to our database so that you can share your experiences with other people that want to try it.
                        </div>
                    </div>
                </Link>
                <div className={`${styles.place} ${styles.section}`} >
                    <div className={styles.left_section}>
                        <i className={`bi bi-floppy ${styles.icon}`}></i> Save a Place
                    </div>
                    <div className={styles.right_section}>
                        Save a place you want to go, so it's easier to find it the next time you want to search for it. <br></br>
                        To save a place, you just have to enter in the page of that place and press the button save on top-right. <br></br>
                        To watch the saved place you just have to enter into your profile page, to do that you have to be logged.
                    </div>
                </div>
                <div className={`${styles.place} ${styles.section}`} >
                    <div className={styles.left_section}>
                        <i className={`bi bi-chat-left-text ${styles.icon}`}></i> Add a Review
                    </div>
                    <div className={styles.right_section}>
                        Add a review to a place you’ve been in so that other people can understand if the place is recommended and suitable for them.
                    </div>
                </div>
                {!session ? (
                    <div className={styles.flex}>
                        <Link className={`${styles.place} ${styles.sectionlr} ${styles.nope}`} href={`/login`}>
                            <div className={styles.left_section}>
                                <i className={`bi bi-person ${styles.icon}`}></i> Login
                            </div>
                            <div className={styles.right_section}>
                                Login if you already have an account
                            </div>
                        </Link>
                        <Link className={`${styles.place} ${styles.sectionlr} ${styles.nope}`} href={`/register`}>
                            <div className={styles.left_section}>
                                <i className={`bi bi-person-plus ${styles.icon}`}></i> Register
                            </div>
                            <div className={styles.right_section}>
                                Register if you don't
                            </div>
                        </Link>
                    </div>
                ) : null}
            </div>
        </>
    );
} 