"use server";
import prisma from "@/lib/db";

// get the user information from the userMail
export async function getUser(userMail: string) {
    try {
        if (userMail) {
            const existinguser = await prisma.user.findUnique({
                where: {
                    email: userMail,
                },
            });
            return existinguser;
        }
        return undefined;
    }
    catch (e) {
        console.error(e);
    }
}