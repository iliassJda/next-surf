"use server"


import prisma from "@/lib/db";


//save the experience to the database. The experience needs the id of the user and the spot it belongs to. First get those and if they are valid save the url to the database.
export async function handleSpotImage(city: string, title: string, userEmail: string, imageURL: string){

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


//get all experience images of a specific spot from the database.
export async function getSpotImages(city: string, title: string){

    const existingSurfSpot = await prisma.surfSpot.findUnique({
        where: {
            city_title: {
                city,
                title,
            },
        },
    });

    const images = await prisma.spotImage.findMany({
        where:  {
            surfSpotId: existingSurfSpot?.id,
        }
    })
    
    return images;
}