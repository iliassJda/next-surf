

//return all existing surf spots in the database
export async function getExistingSurfSpots(){
    try {
       const getSpotsResponse = await fetch(`/api/uploadCare/getSurfSpot?`)
        const spots = await getSpotsResponse.json();
        const surfSpots = spots.existingSurfSpots

        return surfSpots;

    }
    catch (e) {
        console.error(e);
    }
}