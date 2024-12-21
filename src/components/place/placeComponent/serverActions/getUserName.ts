"use server"

import prisma from "@/lib/db";


export async function getUserName(city: string, title: string){

    const spotOfUser = await prisma.surfSpot.findUnique({
        where: {
            city_title: {
                city,
                title
            }
        },
        select: {
            userId: true
        }
    })

    const userID = spotOfUser?.userId

    const userName = await prisma.user.findUnique({
        where: {
            id: userID,
        },
        select : {
            username: true
        }
    })

    return userName;

}