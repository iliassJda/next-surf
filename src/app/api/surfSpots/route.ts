import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';
import prisma from "@/lib/db";



async function getSurfSpotsFromPrisma(countryName: string){
    const allSpots = await prisma.surfSpot.findMany({
        where: {
            country: countryName,
        },
        select: {
            title: true,
            imageURL: true,
        },
    });
    try {
        // @ts-ignore
        return allSpots
    }
    catch (error){
        return NextResponse.json(
            {error: "prisma can't find Spots"},
            {status: 500}
        );
    }
}



export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
        return NextResponse.json(
            { error: "Email parameter is required" },
            { status: 400 }
        );
    }

    try {
        // @ts-ignore

        let userProfilePictureURL = await getSurfSpotsFromPrisma(country)

        return NextResponse.json(userProfilePictureURL, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "get profile picture request failed"},
            {status: 500}
        );
    }

}