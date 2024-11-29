"use client";

import React,{useEffect, useState } from "react";
import ResponsiveCarousel from '../countryCarousel/bootstrapcountryCarousel';

export default function ShowProfilePicture({ countryName }: { countryName: string }) {
    const [surfSpotImages, setSurfSpotImages] = useState<string[]>([]); // Array to hold image URLs
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSurfSpots = async () => {
            try {
                const response = await fetch(`/api/surfSpots?country=${encodeURIComponent(countryName.toLowerCase())}`);
                const data = await response.json();
                console.log(data);

                if (Array.isArray(data) && data.length > 0) {
                    setSurfSpotImages(data); // Assume API returns an array of image URLs
                } else {
                    console.log("No surf spots found.");
                }
            } catch (error) {
                console.error("Failed to fetch surf spots:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetch attempt
            }
        };

        void fetchSurfSpots();
    }, [countryName]);

    // if (isLoading) {
    //     return <p>Loading images...</p>; // Loading state
    // }

    if (surfSpotImages.length === 0) {
        return null; // No images state
    }

    return (  
        <React.Fragment key={countryName}>
            <li>{countryName}
              <ResponsiveCarousel
                images={surfSpotImages}
                height={60}
                width={408}
              />
            </li>
        </React.Fragment>
    );
}
