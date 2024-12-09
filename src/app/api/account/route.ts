import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";

async function Getaccount(userName: string) {
  try {
    const account = await prisma.user.findUnique({
      where: {
        username: userName,
      },
      select: {
        id: true,
        email:true,
        username:true,
        password:true,
        firstname:true,
        lastname:true,
        nationality: true,
        profilePictureCID:true,
      },
    });

    return account;
  } catch (error) {
    console.error("FULL ERROR DETAILS:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("userName");

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        let account = await Getaccount(username);

        if (!account) {
            return NextResponse.json(
                { error: "Account not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(account, {status: 200});
    } catch (e) {
        console.error("Route error:", e);
        return NextResponse.json(
            {error: "get account request failed"},
            {status: 501}
        );
    }
}