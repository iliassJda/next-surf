"use client"

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Styles from "@/components/place/placeComponent/deletePopUp.module.css"
import {deleteSpot} from "@/components/place/placeComponent/serverActions/deleteSpot";
import {redirect} from "next/navigation";


//pop up for deleting a surf spot
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
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const handleDeleteClick = () => {
        setPopUpOpen(true);
    };

    const handleConfirmDelete = async() => {
        console.log(spotCity);
        await deleteSpot(spotCity, spotTitle, parseFloat(longitude), parseFloat(latitude));
        setPopUpOpen(false);
        //after deletion go back to the home page since the surf spot does not exist anymore.
        redirect("/")
    };

    const handleCloseModal = () => {
        setPopUpOpen(false);
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
                onClose={handleCloseModal}
                onConfirm={async() =>{ await handleConfirmDelete()}}

            />
        </div>
    );
};