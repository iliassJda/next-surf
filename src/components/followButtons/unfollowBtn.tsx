"use client";
import React, { useState } from "react";
import styles from "@/app/account/[userName]/account.module.css";
import { showToast } from "@/components/toast/toast";

const UnFollow = (probs: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUsername = probs.currentUsername
  const usernameToFollow = probs.usernameToFollow
  const onUnFollow = probs.onUnFollow
  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/unfollow?currentUsername=${currentUsername}&usernameToFollow=${usernameToFollow}`,
        { method: "POST" }

      );

      if (response.ok) {
        onUnFollow(); // Update parent state
        showToast("success", "Unfollowed successfully!");
      } 
    } catch (error) {
      showToast("error", "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUnfollow}
      disabled={isLoading}
      className={styles.button}
    >
      {isLoading ? "Unfollowing..." : "Unfollow"}
    </button>
  );
};

export default UnFollow;
