"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./countryCarousel.module.css";
import {
  SurfSpots,
  SurfSpot,
} from "../../types";
//Responsive carousel made to display surfspots 
export default function ResponsiveCarousel({
  spotCarouselInfos
}:{
  spotCarouselInfos:SurfSpots;
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

  
  //show 3 spots at time to limit elements on screen
  const getVisibleImages = () => {
    const totalImages = spotCarouselInfos.length;
    return [
      spotCarouselInfos[(startIndex - 1 + totalImages) % totalImages],
      spotCarouselInfos[startIndex],
      spotCarouselInfos[(startIndex + 1) % totalImages],
    ];
  };

  const visibleImages = getVisibleImages();
  //no need to make a carousel if there is 3 or less spots 
  if (spotCarouselInfos.length <= 3) {
    return (
      <div className={styles.Images}>
        <div className={styles.imagesWrapper}>
          {spotCarouselInfos.map((Sci:SurfSpot, index:number) => (
            <div key={Sci.id} className={styles.imageContainer}>
            <Link href={`/places/${Sci.country}/${Sci.city}/${Sci.title}/${Sci.longitude}/${Sci.latitude}`}>
              <img
                src={Sci.imageURL}
                alt={`Non Carousel image ${index + 1}`}
              />
            </Link>
              <p>{Sci.title}</p>
            </div>
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
            {visibleImages.map((Sci:SurfSpot, index:number) => (
              <div key={Sci.id} className={styles.imageContainer}>
              <Link href={`/places/${Sci.country}/${Sci.city}/${Sci.title}/${Sci.longitude}/${Sci.latitude}`}>
                <img
                  src={Sci.imageURL}
                  alt={`Carousel image ${index + 1}`}
                />
              </Link>
                <p>{Sci.title}</p>
              </div>
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