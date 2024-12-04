"use server";
import prisma from "@/lib/db";

export async function getUploadedPlaces(userMail: string) {
    try {
        if (userMail) {
            const existinguser = await prisma.user.findUnique({
                where: {
                    email: userMail,
                },
                include: {
                    posts: true,
                },
            });
            return existinguser?.posts;
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
    }
}