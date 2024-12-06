"use client"

import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/place/carousel.module.css";
import Image from "next/image";
import {getMostPopularSpots} from "@/components/carousel/getMostPopular";
import {Skeleton} from "@mui/material";
import Link from "next/link";

export default function BootstrapCarouselWithoutArrows(imageURLS: string[]){
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(true);

  const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
    setIndex(selectedIndex);
  };

  console.log(imageURLS);


  return (
      <div className={styles.carousel}>
        {loaded ? (
            <div className={styles.centering}>
              <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carouselItem} controls={false}>
                {imageURLS.imageURLS.map((imageURL, idx) => (
                    <Carousel.Item key={idx} className={styles.carouselItem}>
                      <div className={styles.imageContainer}>
                        <Image
                            src={imageURL}
                            alt={`${idx}`}
                            height={500}
                            width={800}
                            className={styles.img}
                        />
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