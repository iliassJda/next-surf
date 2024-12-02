


export async function getExistingSurfSpots(){
    try {
       const getSpotsResponse = await fetch(`/api/uploadCare/getSurfSpot?${new URLSearchParams({
            allOrOne: 'all',
            latitude: '0',
            longitude: '0'
       })}`)
        const spots = await getSpotsResponse.json();
        const surfSpots = spots.existingSurfSpots

        return surfSpots;

    }
    catch (e) {
        console.error(e);
    }
}