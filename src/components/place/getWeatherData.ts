


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



export async function getTideData(latitude: number, longitude: number, startDate: string, endDate: string) {

    const tideURL = new URL('https://api.stormglass.io/v2/tide/extremes/point');
    tideURL.searchParams.append('lat', latitude.toString());
    tideURL.searchParams.append('lng', longitude.toString());
    tideURL.searchParams.append('start', startDate);
    tideURL.searchParams.append('end', endDate);


    const tideResponse = await fetch(tideURL.toString(), {
        method: 'GET',
        headers: {
            'Authorization': process.env.NEXT_PUBLIC_STORMGLASS_ACCESS_TOKEN,
            'Accept': 'application/json'
        }
    });

    const tideData = await tideResponse.json()
    //console.log(tideData)

    return tideData




}






