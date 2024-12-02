"use client"

import React, { useState } from "react";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";

interface ResponsiveCarouselProps {
  images: string[];
  height?: number;
  width?: number;
  className?: string;
}

export default function ResponsiveCarousel({
  images,
  height = 300,
  width = 2040,
  className
}: ResponsiveCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(prev => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setStartIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const getVisibleImages = () => {
    return [
      images[(startIndex) % images.length],
      images[(startIndex + 1) % images.length],
      images[(startIndex + 2) % images.length]
    ];
  };

  const visibleImages = getVisibleImages();

  if (images.length <= 3) {
    return (
      <div className="Main">
        <div className="carousel">
          {images.map((Obj, index) => (
            <Link
              key={index}
              href={`/${Obj.title}`}>
              <img
                src={Obj.content}
                alt={`Carousel image ${startIndex + index + 1}`}
                className ="img"
                style={{
                  height: `${height}px`,
                  width: `${width / 3}px`
                }}
              />
            </Link>
          ))}
        </div>
      </div>);
  } else {

    return (
      <div className="Main">
        <div className="carousel">
          <button
            onClick={handlePrev}
            className="btn"
          >
            Previous
          </button>
          {visibleImages.map((imagePath, index) => (
            <a
              key={index}
              href={`/login${startIndex + index + 1}`}>
              <img
                src={imagePath}
                alt={`Carousel image ${startIndex + index + 1}`}
                className="img"
                style={{
                  height: `${height}px`,
                  width: `${width / 3}px`
                }}
              />
            </a>
          ))}
          <button
            onClick={handleNext}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}