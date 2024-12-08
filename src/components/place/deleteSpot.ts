"use server"

import prisma from "@/lib/db";


export async function deleteSpot(city: string, title: string, longitude: number, latitude: number){

    if(!city || !title) return
    console.log(latitude, longitude)
    try{
        await prisma.surfSpot.delete({
            where: {
                latitude_longitude: {
                    latitude,
                    longitude,
                },
                city: city,
                title: title,
            }
        })
    }catch(err){
        console.log(err)
    }
}