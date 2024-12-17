"use client";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/account/account.module.css";
import UploadedPlaces from "@/components/account/uploadedPlaces";
import SavedPlaces from "@/components/account/savedPlaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AccountInfo } from "../../../types";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import FollowedUser from "@/components/followedUser/followedUser";
import Follow from "@/components/followButtons/followBtn";
import UnFollow from "@/components/followButtons/unfollowBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Account(props: any) {
  const params = useParams();
  const username = params?.userName as string;

  const [account, setAccount] = useState<AccountInfo>();
  const [isLoadingAccount, setIsLoadingAccount] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState<boolean>(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(
          `/api/account?userName=${encodeURIComponent(username)}`
        );
        if (!response.ok) {
          notFound();
          return;
        }

        const data: AccountInfo = await response.json();
        setAccount(data);
      } catch (error) {
        console.error("Failed to fetch account:", error);
        notFound();
      } finally {
        setIsLoadingAccount(false);
      }
    };

    void fetchAccount();
  }, [username]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!session?.user?.username || !account?.username) {
        setIsLoadingFollowing(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/isfollowing?currentUsername=${session.user.username}&targetUsername=${account.username}`
        );
        const data = await response.json();
        setIsFollowing(data);
      } catch (error) {
        console.error("Failed to check following status:", error);
      } finally {
        setIsLoadingFollowing(false);
      }
    };

    if (!isLoadingAccount) {
      fetchFollowing();
    }
  }, [account, session, isLoadingAccount]);

  if (status === "loading") {
    return <p>Checking Session...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in.</p>;
  }

  if (isLoadingAccount && isLoadingFollowing) {
    return <p>Loading account...</p>;
  }

  if (!account) {
    notFound();
  }

  const isOwnAccount = session.user.username === account.username;

  return (
    <div className={styles.container}>
      <div className={`${styles.section} py-4 px-5`}>
        <h2>Account</h2>
      </div>

      <div className={`${styles.section} py-4 px-5`}>
        {!isOwnAccount &&
          (isFollowing ? (
            <UnFollow
              currentUsername={session.user.username}
              usernameToFollow={account.username}
              onUnFollow={() => setIsFollowing(false)} // Callback to update state
            />
          ) : (
            <Follow
              currentUsername={session.user.username}
              usernameToFollow={account.username}
              onFollow={() => setIsFollowing(true)} // Callback to update state
            />
          ))}
      </div>

      <div className={`${styles.section} py-4 px-5`}>
        <h5>Personal Information</h5>
      </div>
      <div className={`${styles.section} px-5`}>
        <div className={styles.left_selection}>
          <ShowProfilePicture width="150" height="150" email={account.email} />
          <br />
          {isOwnAccount && (
            <div>
              <Uploader />
              <br />
              <br />
              <Link
                key={account.id}
                className={`${styles.submit} py-2 px-2`}
                href="/account_update"
              >
                <i className="bi bi-pencil-square"></i> Edit Personal
                Information
              </Link>
            </div>
          )}
        </div>
        <div className={`${styles.right_section} ${styles.flex}`}>
          <div className={styles.left_section}>
            <p className="py-1 px-2">User Name: {account.username}</p>
            <p className="py-1 px-2">Nationality: {account.nationality}</p>
            {isOwnAccount && (
              <>
                <p className="py-1 px-2">First Name: {account.firstname}</p>
                <p className="py-1 px-2">Last Name: {account.lastname}</p>
                <p className="py-1 px-2">Email: {account.email}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.section} py-4 px-5`}>
        <h5>Uploaded Places</h5>
      </div>
      <UploadedPlaces accountemail={account.email} />

      <div className={`${styles.section} py-4 px-5`}>
        <h5>Saved Places</h5>
      </div>
      <SavedPlaces />

      <div className={`${styles.section} py-4 px-5`}>
        <h5>Followed Users</h5>
      </div>
      <FollowedUser username={account.username} />
      <br />
    </div>
  );
}
