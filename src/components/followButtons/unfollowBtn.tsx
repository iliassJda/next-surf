"use client";
import Input from "./input";
import LoginButton from "./followBtn";
import React, {useEffect, useState} from 'react';
import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";
import { showToast } from "../toast/toast";
import { unfollowProfile } from "@/action/follow";
import { FollowInfo } from "@/types";

export default function unfollowBtn(probs: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUsername = probs.currentUsername;
  const usernameToFollow = probs.targetUsername;

  const handleunFollow = async () => {
    const res = await unfollowProfile({currentUsername,usernameToFollow});
        if (res.status == "error") {
          showToast("error", res.message);
        } else {
          showToast("success", res.message);
          setIsLoading(false)
        }
  };

  return (
    <div className={styles.followButtonContainer}>
      {!isLoading ? (
        <p>Loading unfollow...</p> // Show a loading message while waiting
      ) : (
        <LoginButton  title="Unfollow" />
      )}
    </div>
  );
}
