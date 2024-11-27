'use client';
import { notFound, useParams } from 'next/navigation';
import data from '../../../public/temporary.json'; // adjust the path as needed

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

  return (
    <div>
      <h1>{continent}</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.country}>{country.country}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContinentPage;