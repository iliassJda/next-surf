"use client"

import React, { useState } from "react";
import {items} from "../../../public/items.json"
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../carousel/carousel.module.css";
import Image from "next/image";
import shunshine from "../../../public/sunshine.jpg"
import pork from "../../../public/johnPork.jpg"
import pork2 from "../../../public/images.jpg"
import prisma from "@/lib/db";

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
          <a href={`/login${startIndex+index+1}`}>
          <img 
            key={index}
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