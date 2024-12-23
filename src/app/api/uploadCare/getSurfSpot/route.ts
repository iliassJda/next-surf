import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";




async function getAllSurfSpotsPrisma() {

    try {
        const existingSurfSpots = await prisma.surfSpot.findMany({
            select: {
                latitude: true,
                longitude: true,
                city: true,
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
            {error: "prisma can't find surf spots"},
            {status: 500}
        );
    }
}



export async function GET(request: NextRequest) {
    try {
        const spots = await getAllSurfSpotsPrisma()
        return NextResponse.json(spots, {status: 200});
    }catch (e) {
        return NextResponse.json(
            {error: "get all spots failed"},
            {status: 500}
        )}



}