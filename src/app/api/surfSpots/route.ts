import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';
import prisma from "@/lib/db";


async function getSurfSpotsFromPrisma(continentname: string){
    const allSpots = await prisma.surfSpot.findMany({
        where: {
            continent: continentname,
        },
        select: {
            title: true,
            country:true,
            city:true,
            longitude:true,
            latitude:true,
            imageURL: true,
            id:true,
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
    const continentname = searchParams.get("continentName");

    if (!continentname) {
        return NextResponse.json(
            { error: "Email parameter is required" },
            { status: 400 }
        );
    }

    try {
        // @ts-ignore

        let userProfilePictureURL = await getSurfSpotsFromPrisma(continentname)

        return NextResponse.json(userProfilePictureURL, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "get profile picture request failed"},
            {status: 501}
        );
    }

}