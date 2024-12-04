'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './floating.module.css';
import {redirect} from "next/navigation";
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();


    const handlePlusClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputSubmit = () => {
        router.push('/uploadSurfSpot');
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

            <Fab color="primary" aria-label="add" onMouseEnter={handlePlusClick}>
                <AddIcon />
            </Fab>

        </div>
    );
}