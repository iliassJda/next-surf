"use client"

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Styles from "@/components/place/deletePopUp.module.css"
import {deleteSpot} from "@/components/place/deleteSpot";
import {redirect} from "next/navigation";



function DeletePopUp({ isOpen, onClose, onConfirm }: any){
    if (!isOpen) return null;

    return (
        <div className={Styles.modalOverlay}>
            <div className={Styles.modalContent}>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this surf spot?</p>
                <div className={Styles.modalActions}>
                    <button onClick={onClose} className={Styles.cancelButton} >Cancel</button>
                    <button onClick={onConfirm} className={Styles.deleteButton}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default function SpotDelete({spotCity, spotTitle, longitude, latitude}: {spotCity: string, spotTitle: string, longitude: string, latitude: string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async() => {
        console.log(spotCity);
        await deleteSpot(spotCity, spotTitle, parseFloat(longitude), parseFloat(latitude));
        setIsModalOpen(false);
        redirect("/")
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={async() =>{ await handleConfirmDelete()}}

            />
        </div>
    );
};