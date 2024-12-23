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

    //expand the action button, shows the button to go to the upload place page.
    const handlePlusClick = () => {
        setIsExpanded(!isExpanded);
    };

    //used router push such that when a user wants to go back to the previous page, it actually goes to the previous one and not to the home page.
    const handleSubmit = () => {
        router.push('/uploadSurfSpot');
    };

    return (
        /*on mouse enter and onclick to be mobile friendly. Not only hovering*/

        <div className={styles.container}>
            {isExpanded && (
                <div className={styles.submitContainer}>
                    <button
                        onClick={handleSubmit}
                        className={styles.submitButton}
                    >
                        Upload a spot
                    </button>

                </div>
            )}

            <Fab color="primary" aria-label="add" onMouseEnter={handlePlusClick} onClick={handlePlusClick}>
                <AddIcon />
            </Fab>

        </div>
    );
}