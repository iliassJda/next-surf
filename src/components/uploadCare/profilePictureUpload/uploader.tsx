"use client"

import React, {useRef, useState} from 'react';
import { uploadFile } from '@uploadcare/upload-client';
import {showToast} from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Style from "@/components/uploadCare/profilePictureUpload/upload.module.css";
import Button2 from "@/components/materialUIButtons/button2";
import styles from "@/app/account/account.module.css";


export default function Uploader() {
    //use ref. use the upload button to upload the picture. The input field will be outside of the screen. This is a hack.
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user
    const userEmail = user?.email as string;

    return (
        <div className={Style.uploader}>
            <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange= {async (event) => {

                    const file = event.target.files?.[0];
                    if (!file) return;


                    try {
                        // Upload the file to Uploadcare
                        const uploadedFile = await uploadFile(
                            file,
                            {
                                publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
                            }
                        );

                        // Construct the file URL
                        const fileUrl = `https://ucarecdn.com/${uploadedFile.uuid}/`;

                        const data = new FormData();
                        data.append("profilePictureURL", fileUrl);
                        data.append("userEmail", userEmail);

                        const uploadRequest = await fetch("/api/uploadCare/uploadProfilePicture", {
                            method: "POST",
                            body: data,
                        })

                        showToast("success", "Image Uploaded Successfully");
                        console.log(fileUrl);

                    } catch (err) {
                        console.log(err);
                    } }}
            />
            <a
                className={`${styles.submit} py-2 px-2`}
                onClick={() => {
                    fileInputRef.current?.click();
                }}
            >
               <i className="bi bi-upload"></i> Upload
            </a>
        </div>
    );
};
