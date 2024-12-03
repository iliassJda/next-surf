"use server"

import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export async function getProfilePictureURLFromPrisma(userEmail: string){
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    // @ts-ignore
    return existingUser.profilePictureCID;
}