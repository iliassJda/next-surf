"use client";
import styles from "./account_update.module.css";
import Form from "@/components/account/form";
import UpdateButton from "@/components/account/button";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSession } from "next-auth/react";
import { AccountInfo } from "@/types";
import { getUser } from "@/components/account/getUser";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Account(probs: any) {
  const params = useParams();
  const username = params?.username as string;
  
  const { data: session, status } = useSession();
  const [sessionUser, setUser] = useState<AccountInfo>();
    
  useEffect(() => {
      async function fetchData() {
        const data = await getUser(session.user.email);
        setUser(data || []); // Safely update state here
      }
      if (session) {
        fetchData();
      }
    }, [session]);

  if (status === "loading") {
    return <p>Checking Session</p>
  }
  if (status === "unauthenticated") {
    return <p>Please Log in</p>
  }
  return (
    <>
      <div className={`${styles.container} py-4 `}>
        <div className={`${styles.section} py-4 `}>
          <h2 className={styles.title}>Update your Personal Information</h2>
        </div>
        <div className={`${styles.section}`}>
          <div className={styles.left_section}>
            <p className={styles.info}>Name : </p>
            <p className={styles.info}>Surname : </p>
            <p className={styles.info}>Nationality : </p>
            <p className={styles.info}>Password : </p>
            <p className={styles.info}>Verify Password : </p>
          </div>
          <div className={`${styles.right_section} mt-3`}>
            <Form />
          </div>
        </div>
        <a className={styles.x} href={`/account/${username}`}> <i className="bi bi-x-circle"></i> </a>
      </div>
    </>
  );
}