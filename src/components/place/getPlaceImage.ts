"use server"


import prisma from "@/lib/db";

export async function getPlaceImages(city: string, title: string){

        try {
            const existingSurfSpot = await prisma.surfSpot.findUnique({
                where: {
                    city_title: {
                        city,
                        title,
                    },

                },
            });


            const images = await prisma.spotImage.findMany({
                where: {
                    surfSpotId: existingSurfSpot.id,
                }
            })
            console.log("images gotten");

            return images;

        }
        catch (error){
            return error;
        }

}