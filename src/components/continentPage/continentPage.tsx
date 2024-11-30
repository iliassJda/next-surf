'use client';
import React from 'react'; // Add this import
import { notFound, useParams } from 'next/navigation';
import data from '../../../public/temporary.json';
import ResponsiveCarousel from '../countryCarousel/bootstrapcountryCarousel';
import GetSpots from '../getSpots/getSpots';




const ContinentPage = () => {
  const params = useParams();
  const continent = params?.continentName as string;
  const filteredContinents = data.items.continent.filter(
    (c) => c.toLowerCase() === continent.toLowerCase()
  );
 
  
  if (filteredContinents === undefined) {
    notFound();
  }
  
  const filteredContinent = filteredContinents[0] 

  console.log(filteredContinent)

  return (
    <div>
      <h1>{continent}</h1>
      <GetSpots continent = {filteredContinent}/>
    </div>
  //   <ul>
  //   {countriesSpots.map((countrySpots) => (
  //     <React.Fragment key={countrySpots[0].country}>
  //       <li>
  //         {countrySpots[0].country}
  //         <ResponsiveCarousel
  //           images={countrySpots.map((s) => s.imageURL)}
  //           height={60}
  //           width={408}
  //         />
  //       </li>
  //     </React.Fragment>
  //   ))}
  // </ul>
  );
};

export default ContinentPage;