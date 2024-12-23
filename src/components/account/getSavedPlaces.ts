"use server";
import prisma from "@/lib/db";

//function to get the saved place for the logged user
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