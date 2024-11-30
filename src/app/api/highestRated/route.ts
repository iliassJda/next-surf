import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";



async function GetTopSpots(amount: number) {

    try {
        const topTenSurfSpots = await prisma.surfSpot.findMany({

            orderBy:{
                rating: "desc"
            },

            take: amount,

            select: {
                imageURL: true,
                title: true,
            }
        });

        return {topTenSurfSpots}
    }
    catch (error){
        return NextResponse.json(
            {error: "top ten failed"},
            {status: 500}
        );
    }
}



export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const amount = parseInt(<string>searchParams.get("amount"));
    console.log(amount);
    try {
        const topSpots = await GetTopSpots(amount)
        return NextResponse.json(topSpots, {status: 200});
    }
    catch (e) {
        return NextResponse.json(
            {error: "get all spots failed"},
            {status: 500}
        )}
}