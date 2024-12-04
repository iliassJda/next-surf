"use server"


import prisma from "@/lib/db";

export async function uploadSpotImage(city: string, title: string, userEmail: string, imageURL: string){

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

        const result = await prisma.spotImage.create({
            data:{
                imageURL: imageURL,
                userId: user?.id,
                surfSpotId: existingSurfSpot?.id,
            }
        })
        console.log(result)
        console.log("ik kom hier")
        return "success"
    }
    catch (error){
        return error;
    }

}