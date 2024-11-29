



export async function getLocationData(longitude: number | undefined, latitude: number | undefined, accessToken: string): Promise<any> {
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
        city = cityFeature.text;
        return {
            country: country + ", ",
            city: city,
        }
    }
    else{
        return { country: "location not found", city: "" };
    }
}