import { NextResponse } from "next/server";
import { getIsFollowing } from "@/action/follow"; 

export async function GET(req: Request) {
  const url = new URL(req.url);
  const currentUsername = url.searchParams.get("currentUsername");
  const targetUsername = url.searchParams.get("targetUsername");

  if (!currentUsername || !targetUsername) {
    return NextResponse.json(
      { error: "Both currentUsername and targetUsername are required" },
      { status: 400 }
    );
  }

  try {
    const isFollowing = await getIsFollowing(currentUsername, targetUsername);
    return NextResponse.json(isFollowing , { status: 200 });
  } catch (error) {
    console.error("Error checking following status:", error);
    return NextResponse.json(
      { error: "Failed to check following status" },
      { status: 500 }
    );
  }
}
