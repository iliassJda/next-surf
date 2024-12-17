"use client";

import Image from "next/image";
import styles from "@/app/account/account.module.css";
import React, {useEffect,useState} from 'react';
import {getUploadedPlaces} from './getUploadedPlaces';
import { AccountInfo } from "../../../types";
import Link from "next/link";

interface Place {
    id: number;
    title: string;
    country: string;
    continent: string;
    city: string;
    imageURL: string;
    latitude: number;
    longitude: number;
    published: boolean;
    meanRating: number;
    userId: number;
  }

export default function UploadedPlaces(probs: any) {
    const [places, setPlaces] = useState<Place[]>([]);
    const userMail = probs.accountemail;
    useEffect(()=> {
      async function fetchData() {
        const data = await getUploadedPlaces(userMail);
        setPlaces(data || []); // Safely update state here
      }
      if (userMail) {
        fetchData();
      }
    }, [userMail]);


    return(
        <div className={`${styles.scrollable} ${styles.places}`}>
          {places.length === 0 ? (
            <p> No Place uploaded </p>
          ) : (
            <>
            {places.map((place) => (   
              <Link className={styles.nope} href={`/places/${place.country}/${place.city}/${place.title}/${place.longitude}/${place.latitude}`}>
              <div className={`${styles.place} ${styles.section}`}>
                <div className={styles.left_section}>
                  <Image
                    src={place.imageURL}
                    className={styles.img_places}
                    alt="User"
                    width={200}
                    height={100}
                  />
                </div>
                <div className={styles.right_section}>
                  <h4>{place.title}</h4>
                  <p>
                    {" "}
                    <i className="bi bi-geo-alt"></i>{place.city}, {place.country}
                  </p>
                </div>
              </div>
              </Link> 
              ))}
              </>
          )}
        </div>
    );
}
