"use client"

import { useRef, useState, useEffect } from "react";
import Button2 from "@/components/materialUIButtons/button2";
import { showToast } from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Bron from "/images/defaultProfile.png"
import Styles from "@/components/profilePicture/showPicture/uploader.module.css"
export default function ShowProfilePicture() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user;
    const userMail = user?.email as string;
    const [imageURL, setImageURL] = useState<string>("/images/defaultProfile.png"); // Default image
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (status === "authenticated") {
                if(user?.image){
                    setImageURL(user?.image);
                }
                else {
                    try {
                        const getProfilePictureRequest = await fetch(`/api/uploadCare/getProfilePicture?email=${encodeURIComponent(userMail)}`, {
                            method: "GET",
                        });
                        const url = await getProfilePictureRequest.json();
                        if (url !== "none") {
                            setImageURL(url);
                        }
                    } catch (error) {
                        console.log("failed to get profile");
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
                else {
                // If not authenticated, stop loading
                setIsLoading(false);
            }
        };

       fetchProfilePicture();
    }, [status, userMail]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Image className={Styles.Image}
                width={60}
                height={60}
                alt="profile picture"
                src={imageURL}
                onError={() => {
                    setImageURL("/images/defaultProfile.png"); // Fallback image when url can't be found.

                }}
            />
        </div>
    );
}