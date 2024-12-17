"use server";
import prisma from "@/lib/db";

export async function getSavedPlaces(userMail: string) {
    try {
        if (userMail) {
            const existinguser = await prisma.user.findUnique({
                where: {
                    email: userMail,
                },
                include: {
                    saved: true,
                },
            });
            return existinguser?.saved;
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
    }
}