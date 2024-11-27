"use client"

import React, {useRef, useState} from 'react';
import { uploadFile } from '@uploadcare/upload-client';
import {showToast} from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Style from "@/components/uploadCare/profilePictureUpload/upload.module.css";
import Button2 from "@/components/materialUIButtons/button2";


export default function Uploader() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const { data: session, status } = useSession();
    const user = session?.user
    const userEmail = user?.email as string;

    return (
        <div>
            <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange= {async (event) => {

                    const file = event.target.files?.[0];
                    if (!file) return;

                    setUploading(true);

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
                    } finally {
                        setUploading(false);
                    }}}
            />

            <Button2 title="Upload"
                     onClick={() => {
                         fileInputRef.current?.click();
                     }}>
            </Button2>
        </div>
    );
};
