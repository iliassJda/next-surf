import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";






async function saveToPrisma(imageURL: string, userEmail: string){
    try {
        const updateUser = await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                profilePictureCID: imageURL,
            },
        })
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
    const imageURL = data.get("profilePictureURL") as string;
    const userEmail = data.get("userEmail") as string;


    try {
        console.log("ervoor")
        console.log("erna")
        // @ts-ignore
        await saveToPrisma(imageURL, userEmail);

        return NextResponse.json("", {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "post request failed"},
            {status: 500}
        );
    }

}