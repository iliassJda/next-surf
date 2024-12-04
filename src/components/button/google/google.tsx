import styles from "./google.module.css";
// import { signIn } from "@/lib/auth";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <button 
      className={styles.googleBtn}
    >
      <img
        src="https://img.icons8.com/color/48/000000/google-logo.png"
        alt="Google Logo"
      />
      <span>Continue with Google</span>
    </button>
  );
}
