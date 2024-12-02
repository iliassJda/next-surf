import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";



async function getSurfSpotPrisma(city: string, title: string) {

    try {
        const existingSurfSpot = await prisma.surfSpot.findUnique({
            where: {
                city: city,
                title: title
            },
        });

        return {
            latitude: existingSurfSpot.latitude,
            longitude: existingSurfSpot.longitude,
        }

    }
    catch (error){
        return NextResponse.json(
            {error: "prisma can't find surf spots for this city."},
            {status: 500}
        );
    }
}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") as string;
    const title = searchParams.get("title") as string;


        try {
            const lngLat = await getSurfSpotPrisma(city, title)
            return NextResponse.json(lngLat, {status: 200});
        }catch (e) {
            return NextResponse.json(
                {error: "get all spots failed"},
                {status: 500}
            )}

}