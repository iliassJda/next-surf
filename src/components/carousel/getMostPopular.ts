

//return most popular spots.
export async function getMostPopularSpots(amount: number){
    const getSpotsResponse = await fetch(`/api/highestRated?amount=${encodeURIComponent(amount)}`, {
        method: "GET",
    });
    const spots = await getSpotsResponse.json();
    const mostPopular = spots.topTenSurfSpots;
    console.log(mostPopular);

    return mostPopular;

}