'use client';
import React from 'react'; // Add this import
import { notFound, useParams } from 'next/navigation';
import data from '../../../public/temporary.json';
import ResponsiveCarousel from '../countryCarousel/bootstrapcountryCarousel';
import GetSpots from '../getSpots/getSpots';




const ContinentPage = () => {
  const params = useParams();
  const continent = params?.continentName;
  const filteredContinents = data.items.continent.filter(
    (c) => c.toLowerCase() !== continent.toLowerCase()
  );
 
  if (filteredContinents.length === data.items.continent.length) {
    notFound();
  }
  
  const countries = data.items.countries.filter(
    (c) => c.continent.toLowerCase() === continent.toLowerCase()
  );

  const images = [
    '/sunshine.jpg',
    '/johnPork.jpg',
  ];

  return (
    <div>
      <h1>{continent}</h1>
      <ul>
        {countries.map((country) => (
          <GetSpots countryName = {country.country}/>
        ))}
      </ul>
    </div>
  );
};

export default ContinentPage;