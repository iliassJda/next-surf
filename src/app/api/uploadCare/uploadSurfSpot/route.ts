import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";;


async function saveToPrisma(imageUrl: string, userID: string){
    try {
        const updatedUser = await prisma.post.create({
            data: {
                title: imageUrl,
                content : imageUrl,
                published: true,
                userID: userID,
            }
        });
    }
    catch (error){
        return NextResponse.json(
            {error: "prisma create failed"},
            {status: 500}
        );
    }
}
export async function POST(request: NextRequest) {
    const data = await request.formData();
    const country = data.get("country") as string;
    const city = data.get("city") as string;
    const longitude = parseFloat(data.get("longitude") as string);
    const latitude = parseFloat(data.get("latitude") as string);
    const file = data.get("surfSpotURL") as string;
    const userEmail = data.get("userEmail") as string;

    console.log(country);
    console.log(latitude);



    try {

        await saveToPrisma(file, userEmail);

        return NextResponse.json({postMessage: "succeeded"}, {status: 200});
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {error: "post request failed"},

            {status: 500}
        );
    }

}