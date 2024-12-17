import { NextResponse } from "next/server";
import { getFollowersList } from "@/action/follow"; 

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const followers = await getFollowersList(username);
    return NextResponse.json(followers, { status: 200 });
  } catch (error) {
    console.error("Error fetching followers list:", error);
    return NextResponse.json(
      { error: "Failed to fetch followers list" },
      { status: 500 }
    );
  }
}
