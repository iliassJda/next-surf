"use client";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/account/[userName]/account.module.css";
import UploadedPlaces from "@/components/account/uploadedPlaces";
import SavedPlaces from "@/components/account/savedPlaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AccountInfo } from "../../../types";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Account(props: any) {
  const params = useParams();
  const username = params?.userName as string;
  const { data: session, status } = useSession();
  
  const [account, setAccount] = useState<AccountInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(
          `/api/account?userName=${encodeURIComponent(username)}`
        );
        const data: AccountInfo = await response.json();
        console.log("Fetched account data:", data);

        if (response.ok) {
          setAccount(data);
        } else {
          notFound()
        }
      } catch (error) {
        console.error("Failed to fetch account:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAccount();
  }, [username]);

  // Debug logging
  console.log("Session status:", status);
  console.log("Session data:", session);

  if (isLoading) {
    return <p>Loading account...</p>;
  }

  if (account === undefined) {
    notFound();
  }

  // Safely extract session username
  const session_username = session?.user?.username;
  const current_username = account.username;

  console.log("Session username:", session_username);
  console.log("Current account username:", current_username);

  // Determine if this is the logged-in user's account
  const isOwnAccount = session_username === current_username;

  if (status === 'loading') {
    return <p>Checking session...</p>;
  }

  // Render based on whether it's the user's own account
  return (
    <div className={styles.container}>
      <div className={`${styles.section} py-4 px-5`}>
        <h2>Account</h2>
      </div>
      <div className={`${styles.section} py-4 px-5`}>
        <h5>Personal Information</h5>
      </div>
      <div className={`${styles.section} px-5`}>
        <div className={styles.left_selection}>
          <ShowProfilePicture width="150" height="150" />
          <br />
          {isOwnAccount && <Uploader />}
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
          {isOwnAccount && (
            <div className={`${styles.right_section} mt-3`}>
              <Link
                key={account.id}
                className={`${styles.submit} py-2 px-2`}
                href="./account_update"
              >
                <i className="bi bi-pencil-square"></i> Edit Personal Information
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.section} py-4 px-5`}>
        <h5>Uploaded Places</h5>
      </div>
      <UploadedPlaces />
      <div className={`${styles.section} py-4 px-5`}>
        <h5>Saved Places</h5>
      </div>
      <SavedPlaces />
    </div>
  );
}