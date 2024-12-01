"use client"

import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";
import {Skeleton} from "@mui/material";

export default function BootstrapCarousel({imageIndex} : {imageIndex: number}){
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [countries, setCountries] = useState<number[]>([]);
    const [loaded, setLoaded] = useState(false);

    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const getImages = async () => {
            try {
                const spots = await getMostPopularSpots(4)
                const imageUrls = spots.map((spot: { imageURL: string }) => spot.imageURL);

                const titles = spots.map((spot: { title: string }) => spot.title);
                const countries = spots.map((spot: { country: string }) => spot.country);


                setImages(imageUrls);
                setTitles(titles);
                setCountries(countries);
                setLoaded(true);

            } catch (err) {
                console.log(err);
            }
        };
        getImages();
    }, []);

    return (
        <div className={styles.carousel}>
            {loaded ? (
                <div className={styles.centering}>
                    <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carouselItem}>
                        {images.map((imageURL, idx) => (
                            <Carousel.Item key={idx} className={styles.carouselItem}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={imageURL}
                                        alt={`${idx}`}
                                        height={500}
                                        width={800}
                                        className={styles.img}
                                    />
                                    <div className={styles.title}>
                                        <p className={styles.paragraph}>{titles[index]}</p>
                                        <p className={styles.paragraphCountry}>{countries[index]}</p>
                                    </div>
                                </div>
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