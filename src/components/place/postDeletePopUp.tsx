"use client"

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Styles from "@/components/place/deletePopUp.module.css"
import {deleteSpot} from "@/components/place/deleteSpot";
import {redirect} from "next/navigation";



function DeletePopUp({ isOpen, onClose, onConfirm }: any){
    if (!isOpen) return null;

    return (
        <div className={Styles.popUpOverlay}>
            <div className={Styles.popUpContent}>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this surf spot?</p>
                <div className={Styles.popUpActions}>
                    <button onClick={onClose} className={Styles.cancelButton} >Cancel</button>
                    <button onClick={onConfirm} className={Styles.deleteButton}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default function SpotDelete({spotCity, spotTitle, longitude, latitude}: {spotCity: string, spotTitle: string, longitude: string, latitude: string}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsPopUpOpen(true);
    };

    const handleConfirmDelete = async() => {
        await deleteSpot(spotCity, spotTitle, parseFloat(longitude), parseFloat(latitude));
        setIsPopUpOpen(false);
        redirect("/")
    };

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                className={Styles.buttonIcon}
                onClick={handleDeleteClick}
            >
                <DeleteIcon />
            </button>

            <DeletePopUp
                isOpen={isPopUpOpen}
                onClose={handleClosePopUp}
                onConfirm={async() =>{ await handleConfirmDelete()}}

            />
        </div>
    );
};