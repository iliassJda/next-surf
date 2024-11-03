"use client"

import { useState } from "react";
import {items} from "../../../public/items.json"
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";

export default function BootstrapCarousel({imageIndex} : {imageIndex: number}){
    const {bootstrap} = items;
    const [index, setIndex] = useState(0);
    const imagePaths = ["sunshine.jpg", "sunshine.jpg", "https://images.app.goo.gl/Tqmd11iUh5RRkjdp7", "images.jpg", "sunshine.jpg", "sunshine.jpg"]

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
                        <img src= {imagePaths[imageIndex]} alt="" height={300} width={2040} className={styles.img} />
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}