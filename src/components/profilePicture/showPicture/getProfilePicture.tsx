"use client"

import { useRef, useState, useEffect } from "react";
import Button2 from "@/components/materialUIButtons/button2";
import Style from "./upload.module.css"
import { showToast } from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Bron from "/images/defaultProfile.png"
export default function ShowProfilePicture() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user;
    const userID = user?.id as string;
    const userMail = user?.email as string;
    const [imageURL, setImageURL] = useState<string>("/images/defaultProfile.png"); // Default image
    const [isLoading, setIsLoading] = useState(true);

    async function getProfilePicture() {
        if (status === "authenticated") {

            try {
                const getProfilePictureRequest = await fetch(`/api/pinata/getProfilePicture?email=${encodeURIComponent(userMail)}`, {
                    method: "GET",
                });
                console.log(getProfilePictureRequest);
                const url = await getProfilePictureRequest.json();
                console.log(url);
                if (url !== "none") {
                    setImageURL(url);
                }
            } catch (error) {
                console.log("failed to get profilePicture");
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getProfilePicture();
    }, [status, userMail]); // Re-run when session status or email changes

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Image
                width={30}
                height={30}
                alt="profile picture"
                src={imageURL}
                onError={() => {
                    setImageURL("/images/defaultProfile.png"); // Fallback image on error

                }}
            />
        </div>
    );
}