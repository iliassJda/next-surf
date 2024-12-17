"use server"

import prisma from "@/lib/db";


export async function verifyUser(city: string, title: string, userEmail: string) {
    console.log("verifyUser", city, title, userEmail);
    if (!userEmail) return false;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            }
        })

        const existingSurfSpot = await prisma.surfSpot.findUnique({
            where: {
                city_title: {
                    city,
                    title,
                },
            },
        });

        console.log(existingSurfSpot.userId);
        return user?.id === existingSurfSpot?.userId;

    }catch (error) {
        console.error(error);
    }
}