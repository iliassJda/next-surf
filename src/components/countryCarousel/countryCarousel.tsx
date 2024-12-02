"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./countryCarousel.module.css";
import {
  SpotCarouselInfo,
  SpotCarouselInfos,
} from "../../components/types";

export default function ResponsiveCarousel({
  spotCarouselInfos
}:{
  spotCarouselInfos:SpotCarouselInfos;
}
) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev:number) => (prev + 1) % spotCarouselInfos.length);
  };

  const handlePrev = () => {
    setStartIndex((prev:number) =>
      prev === 0 ? spotCarouselInfos.length - 1 : prev - 1
    );
  };

  const getVisibleImages = () => {
    const totalImages = spotCarouselInfos.length;
    return [
      spotCarouselInfos[(startIndex - 1 + totalImages) % totalImages],
      spotCarouselInfos[startIndex],
      spotCarouselInfos[(startIndex + 1) % totalImages],
    ];
  };

  const visibleImages = getVisibleImages();

  if (spotCarouselInfos.length <= 3) {
    return (
      <div className={styles.carouselContainer}>
        <div className={styles.Images}>
          {spotCarouselInfos.map((Sci:SpotCarouselInfo, index:number) => (
            <Link key={index} href={`/surfspots/${Sci.title}`}>
              <img
                src={Sci.imageURL}
                alt={`Unique images ${index + 1}`}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.carouselContainer}>
        <button 
          onClick={handlePrev} 
          className={styles.btn}
        >
          &lt;
        </button>
        <div className={styles.Images}>
          <div className={styles.imagesWrapper}>
            {visibleImages.map((Sci:SpotCarouselInfo, index:number) => (
              <Link key={index} href={`/${Sci.title}`}>
                <img
                  src={Sci.imageURL}
                  alt={`Carousel image ${index + 1}`}
                />
              </Link>
            ))}
          </div>
        </div>
        <button 
          onClick={handleNext} 
          className={styles.btn}
        >
          &gt;
        </button>
      </div>
    );
  }
}