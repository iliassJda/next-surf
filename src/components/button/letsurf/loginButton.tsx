"use client";

import { kaushan } from "@/components/fonts";
import styles from "./letssurf.module.css";

export default function Button({ title }: { title: string }) {
  return (
    <button className={`${styles.loginButton} ${kaushan}`}>{title}</button>
  );
}
