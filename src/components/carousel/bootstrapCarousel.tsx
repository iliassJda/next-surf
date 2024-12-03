"use client"

import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";
import {Skeleton} from "@mui/material";
import Link from "next/link";

export default function BootstrapCarousel({imageIndex} : {imageIndex: number}){
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [latitudes, setLatitudes] = useState<number[]>([]);
    const [longitudes, setLongitudes] = useState<number[]>([]);
    const [loaded, setLoaded] = useState(false);

    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const getImages = async () => {
            try {
                const spots = await getMostPopularSpots(6)
                const imageUrls = spots.map((spot: { imageURL: string }) => spot.imageURL);

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
    }, []);

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