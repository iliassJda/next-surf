"use client"

import { useRef, useState, useEffect } from "react";
import Button2 from "@/components/materialUIButtons/button2";
import { showToast } from "@/components/toast/toast";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Bron from "/images/defaultProfile.png"
import Styles from "@/components/profilePicture/showPicture/uploader.module.css"
import {getProfilePictureURLFromPrisma} from "@/components/profilePicture/showPicture/getter";

//Displays Profile picture if there is one otherwise default picture
export default function ShowProfilePicture(probs: any) {
    const foundURL = probs.img
    const imageURL = (foundURL !== "none") ? foundURL :"/images/defaultProfile.png"// given image else Default image
   
    return (
        <div>
            <Image className={Styles.Image}
                width={probs.width}
                height={probs.height}
                alt="profile picture"
                priority={true}
                src={imageURL}
            />
        </div>
    );
}