import styles from "./navbar.module.css";
import { kaushan } from "../fonts";
import SignOutButton from "../button/letsurf/signoutButton";
import userImg from "../../../public/johnPork.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import { auth } from "@/lib/auth";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture"
import Button from "@/components/button/letsurf/signoutButton"
export default async function Navbar() {
  const session = await auth();

  return (
    <header className={kaushan.className}>
      <div id={styles.top_bar}></div>
      <div id={styles.main_bar}>
        <div id={styles.logo_div}>
          <a className={styles.icon} href="./">
            Let's Surf
          </a>
        </div>
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
        </div>
        <div className={styles.space}>
          {session ? (

              <div className={styles.user_menu}>
                <div className={styles.user_container}>
                  <ShowProfilePicture/>
                  <ul className={styles.dropdown}>
                    <li>
                      <a className={styles.icon} href="./account">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className={styles.icon} href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a className={styles.icon} href="#">
                        <Button title="log out"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.icon}>
                <a className={styles.icon} href="login">
                  <i className="bi bi-person-fill"> Log In </i>
                </a>
              </div>
              &nbsp; &nbsp;
              <div>|</div>
              &nbsp;&nbsp;
              <div className={styles.icon}>
                <a className={styles.icon} href="register">
                  <i className="bi bi-person-plus-fill"> Sign Up </i>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
