"use client";

import { kaushan } from "@/components/fonts";
import styles from "./letssurf.module.css";

import { signOut } from "next-auth/react";

export default function Button({ title }: { title: string }) {
  return (
    <button
      className={`${styles.loginButton} ${kaushan}`}
      onClick={() => signOut()}
    >
      {title}
    </button>
  );
}
