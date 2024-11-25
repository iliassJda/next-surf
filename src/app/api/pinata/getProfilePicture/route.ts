import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';
import prisma from "@/lib/db";




async function getProfilePictureCidFromPrisma(userEmail: string){
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    try {
        // @ts-ignore
        return existingUser.profilePictureURL;

    }
    catch (error){
        return NextResponse.json(
            {error: "prisma create failed"},
            {status: 500}
        );
    } finally {
        await prisma.$disconnect();
    }
}
export async function GET(request: NextRequest) {
    console.log("eigenlijk hier");
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

        let userProfilePictureURL = getProfilePictureCidFromPrisma(userEmail)

        return NextResponse.json(userProfilePictureURL, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "get profile picture request failed"},
            {status: 500}
        );
    }

}
