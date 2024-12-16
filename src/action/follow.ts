import prisma from "@/lib/db";
import { FollowInfo } from "@/types";
import { redirect } from "next/navigation";
import { AccountInfo,AccountInfos} from "@/types"

const followProfile = async (data: FollowInfo) => {
    const { currentUsername, usernameToFollow } = data;

    // Fetch the IDs of both users
    const currentUser = await prisma.user.findUnique({
        where: { username: currentUsername },
        select: { id: true },
    });

    const userToFollow = await prisma.user.findUnique({
        where: { username: usernameToFollow },
        select: { id: true },
    });

    if (!currentUser || !userToFollow) {
        throw new Error("One or both users not found");
    }

    // Create a new follow relationship
    await prisma.userFollows.create({
        data: {
            followerId: currentUser.id,
            followedId: userToFollow.id,
        },
    });

    redirect(`/account/${usernameToFollow}`);
};

const unfollowProfile = async (data: FollowInfo) => {
    const { currentUsername, usernameToFollow } = data;

    // Fetch the IDs of both users
    const currentUser = await prisma.user.findUnique({
        where: { username: currentUsername },
        select: { id: true },
    });

    const userToUnfollow = await prisma.user.findUnique({
        where: { username: usernameToFollow },
        select: { id: true },
    });

    if (!currentUser || !userToUnfollow) {
        throw new Error("One or both users not found");
    }

    // Delete the follow relationship
    await prisma.userFollows.deleteMany({
        where: {
            followerId: currentUser.id,
            followedId: userToUnfollow.id,
        },
    });

    redirect(`/account/${usernameToFollow}`);
};

const getFollowingList =  async (currentUsername: string): Promise<AccountInfos> => {
    // Find the current user's ID
    const currentUser = await prisma.user.findUnique({
      where: { username: currentUsername },
      select: { id: true },
    });
  
    if (!currentUser) {
      throw new Error("User not found");
    }
  
    // Fetch the list of users the current user is following
    const following = await prisma.userFollows.findMany({
      where: { followerId: currentUser.id },
      include: {
        followed: {
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            firstname: true,
            lastname: true,
            nationality: true,
            profilePictureCID: true,
          },
        },
      },
    });
  
    // Map the list to match the AccountInfo structure
    return following.map((follow) => follow.followed as AccountInfo);
  };
  
  const getFollowersList = async (currentUsername: string): Promise<AccountInfos> => {
    // Find the current user's ID
    const currentUser = await prisma.user.findUnique({
      where: { username: currentUsername },
      select: { id: true },
    });
  
    if (!currentUser) {
      throw new Error("User not found");
    }
  
    // Fetch the list of users who are following the current user
    const followers = await prisma.userFollows.findMany({
      where: { followedId: currentUser.id },
      include: {
        follower: {
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            firstname: true,
            lastname: true,
            nationality: true,
            profilePictureCID: true,
          },
        },
      },
    });
  
    // Map the list to match the AccountInfo structure
    return followers.map((follow) => follow.follower as AccountInfo);
  };
  
  const getIsFollowing = async (currentUsername: string, targetUsername: string): Promise<boolean> => {
    // Find the current user's ID
    const currentUser = await prisma.user.findUnique({
      where: { username: currentUsername },
      select: { id: true },
    });
  
    if (!currentUser) {
      throw new Error("Current user not found");
    }
  
    // Find the target user's ID
    const targetUser = await prisma.user.findUnique({
      where: { username: targetUsername },
      select: { id: true },
    });
  
    if (!targetUser) {
      throw new Error("Target user not found");
    }
  
    // Check if the current user is following the target user
    const following = await prisma.userFollows.findFirst({
      where: {
        followerId: currentUser.id,
        followedId: targetUser.id,
      },
    });
  
    // Return true if a relationship exists, otherwise false (!! ensures Boolean Value)
    return !!following;
  };

export { followProfile, unfollowProfile,getFollowersList, getFollowingList, getIsFollowing};
