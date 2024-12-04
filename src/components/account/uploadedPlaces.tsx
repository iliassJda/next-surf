"use client";

import Image from "next/image";
import styles from "@/app/account/account.module.css";
import PlacesImg from "../../../public/johnPork.jpg";
import {useSession} from "next-auth/react";
import React, {useState} from 'react';
import {getUploadedPlaces} from './getUploadedPlaces';

interface Place {
    id: number;
    title: string;
    country: string;
    continent: string;
    imageURL: string;
    latitude: number;
    longitude: number;
    published: boolean;
    meanRating: number;
    userId: number;
  }

export default function UploadedPlaces(probs: any) {
    const { data: session, status } = useSession();
    const [places, setPlaces] = useState<Place[]>([]);
    const user = session?.user;
    const userMail = user?.email as string;

    const fetchPlaces = async () => {
        try {
            if(userMail){
                const placess = await getUploadedPlaces(userMail)
                setPlaces(placess || []);
            }
        }
        catch (error){
            console.log("failed to get profile");
        }
    }

    void fetchPlaces();

    return(
        <div className={`${styles.scrollable} ${styles.places}`}>
            {places.map((place) => (    
          <div className={`${styles.place} ${styles.section}`}>
            <div className={styles.left_section}>
              <Image
                src={PlacesImg}
                className={styles.img_places}
                alt="User"
                height={100}
              />
            </div>
            <div className={styles.right_section}>
              <h4>{place.title}</h4>
              <p>
                {" "}
                <i className="bi bi-geo-alt"></i>Oostende, Belgium
              </p>
              <div className={styles.star}>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </div>
            </div>
          </div>
          ))}
        </div>
    );
}
