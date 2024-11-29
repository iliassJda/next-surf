"use client"

import React, {useRef, useState} from 'react';
import { uploadFile } from '@uploadcare/upload-client';
import {showToast} from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Style from "@/components/uploadCare/surfSpotUpload/upload.module.css";
import Button2 from "@/components/materialUIButtons/button2";
import {externalUploader} from "@/components/uploadCare/surfSpotUpload/uploadType";


export default function SurfSpotUploader({title} : {title: string}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const user = session?.user
    const userEmail = user?.email as string;
    const [file, setFile] = useState<string | null>(null);


    return (
        <div className={Style.container}>
            <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange= {async (event) => {
                    await externalUploader(event, userEmail)
                }}
            />

            <Button2 title={title}
                     onClick={() => {
                         fileInputRef.current?.click();
                     }}>
            </Button2>

        </div>
    );
};
