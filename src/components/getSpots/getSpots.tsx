"use client";

import React, { useEffect, useState } from "react";
import ResponsiveCarousel from "../countryCarousel/bootstrapcountryCarousel";
import data from "../../../public/temporary.json";
import { NextResponse } from "next/server";



type SurfSpot = {
    title: string;
    country: string;
    imageURL: string;
    id: number;
  };

export default function ShowSurfSpots({
  continent,
}: {
  continent: string;
}) {
  const [surfSpots, setsurfSpots] = useState<SurfSpot[]>([]); // Array to hold image URLs
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSurfSpots = async () => {
      try {
        const response = await fetch(
          `/api/surfSpots?continentName=${encodeURIComponent(
            continent
          )}`
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          setsurfSpots(data); // Assume API returns an array of image URLs
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
  }, [continent]);

  console.log(continent);
  console.log(surfSpots);

  if (isLoading) {
       return <p>Loading spots...</p>; // Loading state
   }else{
       
   
   
  if (surfSpots.length === 0) {
    return <p>No Spots</p>; // No images state
  }

  const countries = data.items.countries.filter(
    (c) => c.continent.toLowerCase() === continent.toLowerCase()
  );

  const countryNames = countries.map((c)=>c.country)

  const countriesSpots = countries
    .map((c) => surfSpots.filter((s)=>s.country === c.country))
    .filter((c) => c.length !== 0);

  console.log(continent);
  console.log(surfSpots);


  return (
    <ul>
        <p>{surfSpots.map((s)=>s.country)}</p>
        <p>{countryNames}</p>
        <p>{countriesSpots.map((c)=>c[0].toString())}</p>
      {countriesSpots.map((countrySpots) => (
        <React.Fragment key={countrySpots[0].country}>
          <li>
            {countrySpots[0].country}
            <ResponsiveCarousel
              images={countrySpots.map((s) => ({
                title: s.title,
                imageURL: s.imageURL,
              }))}
              height={60}
              width={408}
            />
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}}
