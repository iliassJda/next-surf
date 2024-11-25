"use client"

import {useRef, useState} from "react";
import Button2 from "@/components/materialUIButtons/button2";
import Style from "./upload.module.css"
import {showToast} from "@/components/toast/toast";
import { useSession } from "next-auth/react"


export default function PlaceUploader() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user
    const userID = user?.id as string;
    const userMail = user?.email as string;


    return (
        <div>
            <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={async (e) => {

                    const file = e.target.files?.[0] as File;

                    const data = new FormData();
                    data.append("file", file);
                    data.append("user", userMail);

                    try {
                        const uploadRequest = await fetch("/api/pinata/uploadSurfSpot", {
                            method: "POST",
                            body: data,
                        })
                        showToast("success", "Image Uploaded Successfully");

                    } catch (e) {
                        showToast("error", "Image didn't upload successfully");
                    }

                }}
            />

            <Button2 title="Upload"
                     onClick={()=> {
                         fileInputRef.current?.click();
                     }} >
            </Button2>
        </div>
    );
}