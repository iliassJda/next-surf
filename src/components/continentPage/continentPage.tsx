'use client';
import React from 'react'; 
import { notFound, useParams } from 'next/navigation';
import data from '../../../public/temporary.json';
import GetSpots from '../getSpots/getSpots';
import { NormalizeName,NormalizeURLName } from '../../components/globalFunc'

const ContinentPage = () => {
  const params = useParams();
  const continent = params?.continentName as string;
  const filteredContinents = data.items.continent.filter(
    (c:string) => NormalizeName(c) === NormalizeURLName(continent)
  );
 
  const filteredContinent = filteredContinents[0] 
  
  if (filteredContinent === undefined) {
    notFound();
  }
  
  return (
    <div>
      <h1>{filteredContinent}</h1>
      <GetSpots continent = {filteredContinent}/>
    </div>
  );
};

export default ContinentPage;