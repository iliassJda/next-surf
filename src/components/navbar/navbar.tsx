"use client";
import styles from "./navbar.module.css";
import Image from "next/image";
import userImg from "../../../public/images/user.png";
import { useState } from "react";
import { kaushan } from "../fonts";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "John Pork";

  return (
    <header className={kaushan.className}>
      <div id={styles.top_bar}>
        {!isLoggedIn ? (
          <>
            <div className={styles.icon}>
              <a>
                <i className="bi bi-person-fill"> Log In </i>
              </a>
            </div>
            &nbsp; &nbsp;
            <div>|</div>
            <div className={styles.icon}>
              &nbsp;&nbsp;
              <a>
                <i className="bi bi-person-plus-fill"> Sign Up </i>
              </a>
            </div>
          </>
        ) : (
          <div className={styles.user_menu}>
            <div className={styles.user_container}>
              <Image
                src={userImg}
                alt="User"
                id={styles.user_image}
                width={25}
                height={25}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              &nbsp; {userName}
              <ul className={styles.dropdown}>
                <li>
                  <a href="#">My Profile</a>
                </li>
                <li>
                  <a href="#">Settings</a>
                </li>
                <li>
                  <a href="#">Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div id={styles.main_bar}>
        <div id={styles.logo_div}>Let's Surf</div>
        <div id={styles.search_div}>
          <input
            type="text"
            id={styles.search_bar}
            placeholder="Search a place to surf"
          />
          <div className={styles.icon}>
            <a>
              <i className="bi bi-search p-2"></i>
            </a>
          </div>
          <div className={styles.space}></div>
        </div>
      </div>
    </header>
  );
}
