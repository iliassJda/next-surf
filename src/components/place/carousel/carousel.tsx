"use client"

import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/place/carousel/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";
import {Skeleton} from "@mui/material";
import Link from "next/link";
//same carousel as on the home page but without the arrows. This is the experience carousel.
export default function BootstrapCarouselWithoutArrows(imageURLS: string[]){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
    setIndex(selectedIndex);
  };



  return (
      <div className={styles.carousel}>
              <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carouselItem} controls={false}>
                {imageURLS.imageURLS.map((imageURL, idx) => (
                    <Carousel.Item key={idx} className={styles.carouselItem}>
                        <Image
                            src={imageURL}
                            alt={`${idx}`}
                            height={500}
                            width={800}
                            className={styles.img}
                        />
                    </Carousel.Item>
                ))}
              </Carousel>


      </div>
  );
}