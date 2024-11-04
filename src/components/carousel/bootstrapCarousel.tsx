"use client"

import { useState } from "react";
import {items} from "../../../public/items.json"
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import shunshine from "../../../public/sunshine.jpg"
import pork from "../../../public/johnPork.jpg"
import pork2 from "../../../public/images.jpg"
import chadSurf from "../../../public/chadSurf.jpg"
import sunSurf from "../../../public/sunSurf.jpg"
import porkSurf from "../../../public/PorkSurf.jpg"
import spot1 from "../../../public/spot1.jpg"
import spot2 from "../../../public/spot2jpg.jpg"
import spot3 from "../../../public/spot5.jpg"
import prisma from "@/lib/db";

export default function BootstrapCarousel({imageIndex} : {imageIndex: number}){
    const {bootstrap} = items;
    const [index, setIndex] = useState(0);
    const imagePaths = [chadSurf, sunSurf, porkSurf, spot1, spot2, spot3]

    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };


    return (
        <div className={styles.carousel}>
            <Carousel 
                activeIndex={index} 
                onSelect={handleSelect}
                className={styles.carouselItem}
                
            >
                {bootstrap.map((item) => (
                    <Carousel.Item key={item.id} className={styles.carouselItem}>  
                        <Image src= {imagePaths[imageIndex]} alt="" height={300} width={2040} className={styles.img} />
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}