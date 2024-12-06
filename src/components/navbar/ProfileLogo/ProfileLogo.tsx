import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import styles from "./profileLogo.module.css"
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture"
import Button from "@/components/button/letsurf/signoutButton"

export default async function ProfileLogo(){
    const session = await auth();
    let name = "";
    if (session){
    const user = session?.user
    const userEmail = user?.email  as string;
    const existinguser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (existinguser)
      name = existinguser.firstname;
    }
  

    return (
        <div className={styles.space}>
          {session ? (

              <div className={styles.user_menu}>
                <div className={styles.user_container}>
                  <ShowProfilePicture width="60" height="60"/> &nbsp;&nbsp; {name}
                  <ul className={styles.dropdown}>
                     <li>
                      <Link className={styles.icon} href="/account">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.icon} href="/#">
                        Settings
                      </Link>
                    </li>
                    <li>
                        <Button title="Log Out"/>
                    </li>
                  </ul>
                </div>
            </div>
          ) : (
            <>
              <div className={styles.icon}>
                <Link className={styles.icon} href="/login">
                  <i className="bi bi-person-fill"> Log In </i>
                </Link>
              </div>
               &nbsp; &nbsp;
              <div>|</div>
              &nbsp;&nbsp; 
              <div className={styles.icon}>
                <Link className={styles.icon} href="/register">
                  <i className="bi bi-person-plus-fill"> Sign Up </i>
                </Link>
              </div>
            </>
          )}
        </div>
    )

    
}