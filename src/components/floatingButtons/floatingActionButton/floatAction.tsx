'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './floating.module.css';
import {redirect} from "next/navigation";

export default function FloatingActionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handlePlusClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputSubmit = () => {
        redirect('/uploadSurfSpot');
    };

    return (
        <div className={styles.container}>
            {isExpanded && (
                <div className={styles.inputWrapper}>
                    <button
                        onClick={handleInputSubmit}
                        className={styles.submitButton}
                    >
                        upload a spot
                    </button>

                </div>
            )}

            <button
                onMouseEnter={handlePlusClick}
                className={styles.floatingButton}
            >
                +
            </button>
        </div>
    );
}