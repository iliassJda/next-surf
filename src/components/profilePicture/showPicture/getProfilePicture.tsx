"use client"

import { useRef, useState, useEffect } from "react";
import Button2 from "@/components/materialUIButtons/button2";
import Style from "./upload.module.css"
import { showToast } from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Image from "next/image";


export default function ShowProfilePicture() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user;
    const userID = user?.id as string;
    const userMail = user?.email as string;
    const [imageURL, setImageURL] = useState<string>("https://gray-tough-goldfish-319.mypinata.cloud/files/bafkreifxzs5giwmv56f3diut6v3olpmuhf4parwsev4auyvzt7py2fa7la?X-Algorithm=PINATA1&X-Date=1732579235&X-Expires=30&X-Method=GET&X-Signature=791e65dc4f54f3287c04d4de5aefbb1279dfb942e49ec7b53dadd9ce16195f8f"); // Default image
    const [isLoading, setIsLoading] = useState(true);

    async function getProfilePicture() {
        if (status === "authenticated") {

            try {
                console.log("ik kom hier");
                const getProfilePictureRequest = await fetch(`/api/pinata/getProfilePicture?email=${encodeURIComponent(userMail)}`, {
                    method: "GET",
                });
                console.log("erachter");
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
                width={500}
                height={500}
                alt="profile picture"
                src={imageURL}
                onError={() => {
                    setImageURL("https://gray-tough-goldfish-319.mypinata.cloud/files/bafkreifxzs5giwmv56f3diut6v3olpmuhf4parwsev4auyvzt7py2fa7la?X-Algorithm=PINATA1&X-Date=1732579235&X-Expires=30&X-Method=GET&X-Signature=791e65dc4f54f3287c04d4de5aefbb1279dfb942e49ec7b53dadd9ce16195f8f"); // Fallback image on error

                }}
            />
        </div>
    );
}