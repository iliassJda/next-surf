import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";



async function getSurfSpotPrisma(longitude: number, latitude: number) {

    try {
        const existingSurfSpot = await prisma.surfSpot.findUnique({
            where: {
                longitude: longitude,
                latitude: latitude,
            },
        });

        return {
            country: existingSurfSpot.country,
            latitude: existingSurfSpot.latitude,
            longitude: existingSurfSpot.longitude,
        }

    }
    catch (error){
        return NextResponse.json(
            {error: "prisma can't find CID"},
            {status: 500}
        );
    }
}

async function getAllSurfSpotsPrisma() {

    try {
        const existingSurfSpots = await prisma.surfSpot.findMany({
            select: {
                latitude: true,
                longitude: true,
                country: true,
                title: true,
            }
        });

        return {
            existingSurfSpots
        }

    }
    catch (error){
        return NextResponse.json(
            {error: "prisma can't find CID"},
            {status: 500}
        );
    }
}



export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const longitude = parseFloat(searchParams.get("longitude") as string);
    const latitude = parseFloat(searchParams.get("latitude") as string);
    const allOrOne = searchParams.get("allOrOne");

    if(allOrOne === "all"){
        try {
            const spots = await getAllSurfSpotsPrisma()
            return NextResponse.json(spots, {status: 200});
        }catch (e) {
            return NextResponse.json(
                {error: "get all spots failed"},
                {status: 500}
            )}
    }
    else if(allOrOne === "one"){
        try {
            console.log("get one spot")
            return NextResponse.json("succeeded", {status: 200});
        }catch (e) {
            return NextResponse.json(
                {error: "get one spot failed"},
                {status: 500}
            )}
        }


}