"use client"

import {useEffect, useState} from "react";
import {items} from "../../../public/items.json"
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";

export default function BootstrapCarousel({imageIndex} : {imageIndex: number}){
    const {bootstrap} = items;
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);

    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        // Create an async function inside useEffect
        const getImages = async () => {
            try {
                const spots = await getMostPopularSpots(4)
                const imageUrls = spots.map((spot: { imageURL: string }) => spot.imageURL);
                setImages(imageUrls);
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
                <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carouselItem}>
                    {images.map((imageURL, idx) => (
                        <Carousel.Item key={idx} className={styles.carouselItem}>
                            {/* Use index to show the corresponding image */}
                            <Image
                                src={imageURL}
                                alt={`Slide ${idx}`}
                                height={500}
                                width={800}
                                className={styles.img}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                ) : (
                <p>Loading images...</p>
            )}

        </div>
    );
}