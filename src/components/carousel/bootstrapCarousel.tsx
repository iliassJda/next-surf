"use client"

import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";
import {Skeleton} from "@mui/material";
import Link from "next/link";

export default function BootstrapCarousel(){
    //all of these states are used to have a link to the correct place page. Initially they are empty but after getting the most popular spots they will contain the information for each spot that is popular enough to be shown.
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [latitudes, setLatitudes] = useState<number[]>([]);
    const [longitudes, setLongitudes] = useState<number[]>([]);
    const [loaded, setLoaded] = useState(false);

    //if user presses on one of the bars or the arrows, change the index to the correct one.
    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };


    //get the most popular spots on mount of the page.
    useEffect(() => {
        const getImages = async () => {
            try {
                //most popular spots
                const spots = await getMostPopularSpots(12)
                //Afterward change the states accordingly.
                const imageUrls = spots.map((spot: { imageURL: string }) =>{
                    //fallback, default picture.
                if(spot.imageURL === "none") {
                    return "/images/defaultProfile.png"
                }
                else {
                    return spot.imageURL
                }
                });

                const titles = spots.map((spot: { title: string }) => spot.title);
                const countries = spots.map((spot: { country: string }) => spot.country);
                const cities = spots.map((spot: { city: string }) => spot.city);
                const longitudes = spots.map((spot: { longitude: number }) => spot.longitude);
                const latitudes = spots.map((spot: { latitude: number }) => spot.latitude);


                setImages(imageUrls);
                setTitles(titles);
                setCountries(countries);
                setCities(cities);
                setLatitudes(latitudes);
                setLongitudes(longitudes);
                setLoaded(true);

            } catch (err) {
                console.log(err);
            }
        };
        void getImages();

    }, []);//empty cause has to run on mount

    return (
        <div className={styles.carousel}>
            {loaded ? (
                <div className={styles.centering}>
                    <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carouselItem}>
                        {images.map((imageURL, idx) => (
                            <Carousel.Item key={idx} className={styles.carouselItem}>
                                <Link href={`/places/${countries[idx]}/${cities[idx]}/${titles[idx]}/${longitudes[idx]}/${latitudes[idx]}`}>
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={imageURL}
                                            alt={`${idx}`}
                                            height={500}
                                            width={800}
                                            className={styles.img}
                                        />
                                        <div className={styles.title}>
                                            <p className={styles.paragraph}>{titles[idx]}</p>
                                            <p className={styles.paragraphCountry}>{countries[idx]}</p>
                                        </div>
                                    </div>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                ) : (
                    <div className={styles.skeletonContainer}>
                        <Skeleton className={styles.skeleton} variant="rectangular" width={1200} height={600} animation="pulse" />
                    </div>
            )}

        </div>
    );
}