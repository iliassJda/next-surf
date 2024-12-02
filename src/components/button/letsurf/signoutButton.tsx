"use client";

import styles from "../../navbar/ProfileLogo/profileLogo.module.css";

import { signOut } from "next-auth/react";

export default function Button({ title }: { title: string }) {
  return (
    <a
      className={styles.icon}
      onClick={() => signOut()}
    >
      {title}
    </a>
  );
}
