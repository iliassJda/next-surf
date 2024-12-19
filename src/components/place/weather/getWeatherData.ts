

//get weather data from Stormglass.
export async function getWeatherData(latitude: number, longitude: number, params: Array<any>, startDate: string, endDate: string) {

    const url = new URL('https://api.stormglass.io/v2/weather/point');
    url.searchParams.append('lat', latitude.toString());
    url.searchParams.append('lng', longitude.toString());
    url.searchParams.append('params', params.join(','));
    url.searchParams.append('start', startDate);
    url.searchParams.append('end', endDate);
    url.searchParams.append('source', "noaa");

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Authorization': process.env.NEXT_PUBLIC_STORMGLASS_ACCESS_TOKEN,
            'Accept': 'application/json'
        }
    });

    const weatherData = await response.json()
    console.log(weatherData);

    return weatherData;

}






