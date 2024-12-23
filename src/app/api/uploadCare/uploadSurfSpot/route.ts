import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";
import countriesDATA from "../../../../../public/countries.json"






async function saveToPrisma(continent: string, country: string, city: string, title: string, longitude: number, latitude: number, userID: number){
    try {
        const surfSpot = await prisma.surfSpot.create({
            data: {
                title: title,
                country: country,
                continent: continent,
                city: city,
                latitude: latitude,
                longitude: longitude,
                published: true,
                userId: userID,

            }

        })


        return surfSpot.id
    }
    catch (error) {
        console.log("failed to save to prisma");
        console.log(error);
    }
}

async function getUserID(userEmail: string){

    const user = await prisma.user.findUnique({where: {email: userEmail}});

    return user.id;


}

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const continent = data.get("continent") as string;
    let country = data.get("country") as string;
    country = country.substring(0, country.length - 2);
    const city = data.get("city") as string;
    const title = data.get("title") as string;
    const longitude = parseFloat(data.get("longitude") as string);
    const latitude = parseFloat(data.get("latitude") as string);
    const userEmail = data.get("userEmail") as string;
    const userID = await getUserID(userEmail);




    try {
        //check if country exists in file that contains all countries, if this is not the case the surf spot may not be saved.
        const countryExists =  countriesDATA.items.countries.some(
            countryInJson => countryInJson.name.toLowerCase() === country.trim().toLowerCase()
        );
        if(countryExists){
            const spotID = await saveToPrisma(continent, country, city, title, longitude, latitude, userID);
            return NextResponse.json({postMessage: spotID}, {status: 200});
        }
        else{
            return NextResponse.json({postMessage: "country does not exist"}, {status: 400});
            }
        } catch (e) {
        console.error(e);
        return NextResponse.json(
            {error: "can't upload the surf spot"},

            {status: 500}
        );
    }

}