"use client";

import React, { useEffect, useState } from "react";
import ResponsiveCarousel from "../countryCarousel/countryCarousel";
import data from "../../../public/temporary.json";
import { SurfSpot,SurfSpots,CountryInfo} from "../../types"
import { NormalizeName} from  "../../globalFunc"
import styles from './getSpots.module.css'
//We get all surfspots of all country and make a carousel of them here
export default function ShowSurfSpots({
  continent
}: {
  continent: string;
}) {
  const [surfSpots, setsurfSpots] = useState<SurfSpots>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //fetch all surfspots in a continent
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
          setsurfSpots(data); 
        } else {
          console.log("No surf spots found.");
        }
      } catch (error) {
        console.error("Failed to fetch surf spots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSurfSpots();
  }, [continent]);

  if (isLoading) {
       return <p>Loading spots...</p>; 
   }else{
      
  if (surfSpots.length === 0) {
    return <p>No Spots Registered</p>; 
  }else{
  //get all countries(name,continent) in a continent 
  const countries = data.items.countries.filter(
    (c: CountryInfo) => NormalizeName(c.continent) === NormalizeName(continent)
  );
  // countries to only have there name 
  const countryNames = countries.map((c:CountryInfo)=>c.country)
  // map countryNames to make a list of of surfspots(list of surfspot) in each country
  const countriesSpots = countryNames
    .map((c:string) => surfSpots.filter((s:SurfSpot)=>NormalizeName(s.country) === NormalizeName(c)))
    .filter((c:SurfSpots) => c.length !== 0);
  // display a carousel for each country with their spots
  return (
    <ul className={styles.ul}>
      {countriesSpots.map((countrySpots:SurfSpots) => (
        <React.Fragment key={countrySpots[0].country}>
          <li>
            <h2 className={styles.h2}>{countrySpots[0].country}</h2>
            <ResponsiveCarousel
              spotCarouselInfos={countrySpots}
            />
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}}}
