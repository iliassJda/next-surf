import { NextResponse } from "next/server";
import { unfollowProfile } from "@/action/follow"; 

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const currentUsername = url.searchParams.get("currentUsername");
    const usernameToFollow = url.searchParams.get("targetUsername");
  
    if (!currentUsername || !usernameToFollow) {
      return NextResponse.json(
        { error: "Both currentUsername and usernameToFollow are required" },
        { status: 400 }
      );
    }

    await unfollowProfile({ currentUsername, usernameToFollow });
    return NextResponse.json({ message: "Successfully unfollowed user" }, { status: 200 });
  } catch (error) {
    console.error("Error unfollowing profile:", error);
    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    );
  }
}
