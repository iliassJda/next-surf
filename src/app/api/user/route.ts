import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";



async function route(userEmail: string) {

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        return {
            firstName: existingUser.firstname,
            lastName: existingUser.lastname,
            nationality: existingUser.nationality,
        }

    }
    catch (error) {
        return NextResponse.json(
            { error: "prisma can't find CID" },
            { status: 500 }
        );
    }
}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail") as string;
    console.log("ik kom hier");

    try {
        const user = await route(userEmail);
        return NextResponse.json(user, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { error: "get one spot failed" },
            { status: 500 }
        )
    }
}