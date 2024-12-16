// pages/api/following.ts
import { NextResponse } from "next/server";
import { getFollowingList } from "@/action/follow";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const data = await getFollowingList(username);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch following list" }, { status: 500 });
  }
}
