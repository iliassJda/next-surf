"use client"

import { useState } from "react";
import {items} from "../../../public/items.json"
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";

export default function BootstrapCarousel(){
    const {bootstrap} = items;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={styles.carousel}>
            <Carousel 
                activeIndex={index} 
                onSelect={handleSelect}
                
            >
                {bootstrap.map((item) => (
                    <Carousel.Item key={item.id} className={styles.itemP}>  
                        <img src= "sunshine.jpg" alt="" height={300} width={2040} />
                </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}