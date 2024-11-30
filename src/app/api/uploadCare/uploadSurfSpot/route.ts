import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";






async function saveToPrisma(country: string, city: string, title: string, pictureURL: string, longitude: number, latitude: number, userID: number): Promise<void> {
    try {
        await prisma.surfSpot.create({
            data: {
                title: title,
                content: pictureURL,
                latitude: latitude,
                longitude: longitude,
                published: true,
                userId: userID,
            }

        })
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
    const country = data.get("country") as string;
    const city = data.get("city") as string;
    const title = data.get("title") as string;
    const longitude = parseFloat(data.get("longitude") as string);
    const latitude = parseFloat(data.get("latitude") as string);
    const pictureUrl = data.get("surfSpotURL") as string;
    const userEmail = data.get("userEmail") as string;

    const userID = await getUserID(userEmail);




    try {
        await saveToPrisma(country, city, title, pictureUrl, longitude, latitude, userID);

        return NextResponse.json({postMessage: "succeeded"}, {status: 200});
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {error: "post request failed"},

            {status: 500}
        );
    }

}