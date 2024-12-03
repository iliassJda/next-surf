
export async function getWeatherData(){

    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_STORMGLASS_ACCESS_TOKEN
        }}).then((response) => response.json()).then((jsonData) => {
        // Do something with response data.
    });
}