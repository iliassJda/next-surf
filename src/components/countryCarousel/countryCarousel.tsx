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
    return [
      spotCarouselInfos[startIndex % spotCarouselInfos.length],
      spotCarouselInfos[(startIndex + 1) % spotCarouselInfos.length],
      spotCarouselInfos[(startIndex + 2) % spotCarouselInfos.length],
    ];
  };

  const visibleImages = getVisibleImages();

  if (spotCarouselInfos.length <= 3) {
    return (
      <div className="Main">
        <div className={styles.Images}>
          {spotCarouselInfos.map((Sci:SpotCarouselInfo, index:number) => (
            <Link key={index} href={`/surfspots/${Sci.title}`}>
              <img
                src={Sci.imageURL}
                alt={`Unique images ${startIndex + index + 1}`}
                className={styles.img}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Main">
        <div className={styles.Images}>
          <button onClick={handlePrev} className={styles.btn}>
            Previous
          </button>
          {visibleImages.map((Sci:SpotCarouselInfo, index:number) => (
            <Link key={index} href={`/${Sci.title}`}>
              <img
                src={Sci.imageURL}
                alt={`Carousel image ${startIndex + index + 1}`}
                className={styles.img}
              />
            </Link>
          ))}
          <button onClick={handleNext} className={styles.btn}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
