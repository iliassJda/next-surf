"use client";
import Input from "./input";
import LoginButton from "./followBtn";
import React, { useEffect, useState } from "react";

import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";
import { showToast } from "../toast/toast";
import { followProfile } from "@/action/follow";
import { useSession } from "next-auth/react";
import { FollowInfo } from "@/types";

export default function FollowButton({ currentUsername, usernameToFollow }: FollowInfo) {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state
  const [hasFollowed, setHasFollowed] = useState<boolean>(false); // Track follow status

  const handleFollow = async () => {
    setIsLoading(true); // Start loading

    try {
      console.log(`Sending follow request: ${currentUsername} -> ${usernameToFollow}`);
      const res = await fetch(
        `/api/follow?currentUsername=${currentUsername}&targetUsername=${usernameToFollow}`,
        { method: "POST" }
      );

      if (res.ok) {
        console.log("Successfully followed the user");
        setHasFollowed(true); // Update follow status
      } else {
        console.error("Failed to follow the user");
        showToast("Failed to follow the user. Try again.", "error");
      }
    } catch (error) {
      console.error("Error during follow action:", error);
      showToast("An error occurred. Please try again later.", "error");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Debugging render
  console.log("FollowButton Rendering:", { isLoading, hasFollowed });

  return (
    <div className={styles.followButtonContainer}>
      {isLoading ? (
        <p>Loading...</p> // Display loading state
      ) : hasFollowed ? (
        <p>You are now following this user</p> // Display follow success message
      ) : (
        <LoginButton onClick={handleFollow} title="Follow" /> // Render Follow button
      )}
    </div>
  );
}