"use server"


import prisma from "@/lib/db";

export async function getPlaceImage(city: string, title: string){

        try {
            const existingSurfSpot = await prisma.surfSpot.findUnique({
                where: {
                    city_title: {
                        city,
                        title,
                    },

                },
            });


            return existingSurfSpot.imageURL

        }
        catch (error){
            return error;
        }

}