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
    const [imageURL, setImageURL] = useState<string>("https://gray-tough-goldfish-319.mypinata.cloud/files/bafybeigc5swlehulghkvbbmbsaz7jd4gfktwyxavlhblwuz4l54msi5gdu?X-Algorithm=PINATA1&X-Date=1732533655&X-Expires=30&X-Method=GET&X-Signature=23f057a98acd4a098a6b2f9369a594efadcdbf6b3b6bf5483e5f6cf0f5e0bf27"); // Default image
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
                    setImageURL("https://gray-tough-goldfish-319.mypinata.cloud/files/bafybeigc5swlehulghkvbbmbsaz7jd4gfktwyxavlhblwuz4l54msi5gdu?X-Algorithm=PINATA1&X-Date=1732533655&X-Expires=30&X-Method=GET&X-Signature=23f057a98acd4a098a6b2f9369a594efadcdbf6b3b6bf5483e5f6cf0f5e0bf27"); // Fallback image on error

                }}
            />
        </div>
    );
}