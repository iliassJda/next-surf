import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";






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
        const spotID = await saveToPrisma(continent, country, city, title, longitude, latitude, userID);

        return NextResponse.json({postMessage: spotID}, {status: 200});
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {error: "post request failed"},

            {status: 500}
        );
    }

}