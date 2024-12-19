
import countryContinents from "../../../public/temporary.json"



//returns the location when a user clicks on the map and it places a marker.
export async function getLocationData(longitude: number | undefined, latitude: number | undefined, accessToken: string): Promise<any> {
    let continent: string | undefined = ""
    let country = ""
    let city = ""
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`);
    const data = await response.json();


    if (!data.features || data.features.length === 0) {
        return { country: "location not found", city: "" };
    }

    const countryFeature = data.features.find(
        (feature: any) => feature.place_type.includes('country')
    );
    const cityFeature = data.features.find(
        (feature: any) => feature.place_type.includes('place')
    );



    if (countryFeature && cityFeature) {
        country = countryFeature.text;
        const countryInfo = countryContinents.items.countries.find(
            (item: { country: string; }) => item.country.toLowerCase() === country.toLowerCase()
        );
        if(countryInfo) {
            continent = countryInfo.continent
        }
        else{
            continent = "not found";
        }
        city = cityFeature.text;
        return {
            continent: continent,
            country: country + ", ",
            city: city,
        }
    }
    else{
        return {continent: "", country: "location not found", city: "" };
    }
}


//checks if a place a user typed is a country.
export function submittedCountry(placeName: string){
    const placeIsCountry = countryContinents.items.countries.find(
        (item: { country: string; }) => item.country.toLowerCase() === placeName.toLowerCase()
    );
    return placeIsCountry;
};