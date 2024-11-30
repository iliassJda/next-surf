


export async function getMostPopularSpots(amount: number){
    // @ts-ignore
    const getSpotsResponse = await fetch(`/api/highestRated?amount=${encodeURIComponent(amount)}`, {
        method: "GET",
    });
    const spots = await getSpotsResponse.json();
    const mostPopular = spots.topTenSurfSpots;

    return mostPopular;

}