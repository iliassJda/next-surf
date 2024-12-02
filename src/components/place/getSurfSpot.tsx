export async function getSurfSpotPrisma(city: string, title: string) {
    try {
        const getProfilePictureRequest = await fetch(`/api/uploadCare/getSurfSpot/basedOnCityTitle?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`, {
            method: "GET",
        });
        const lngLat = await getProfilePictureRequest.json();

    } catch (error) {
        console.log("failed to get spot based on city and title");
    }
}