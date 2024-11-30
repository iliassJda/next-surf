import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";



async function getSurfSpotPrisma(userEmail: string){
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    try {
        // @ts-ignore
        return existingUser.profilePictureCID;

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
    const userEmail = searchParams.get("email");

    if (!userEmail) {
        return NextResponse.json(
            { error: "Email parameter is required" },
            { status: 400 }
        );
    }

    try {
        // @ts-ignore

        let userProfilePictureURL = await getProfilePictureURLFromPrisma(userEmail)

        return NextResponse.json(userProfilePictureURL, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "get profile picture request failed"},
            {status: 500}
        );
    }

}