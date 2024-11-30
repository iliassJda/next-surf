import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import styles from "./profileLogo.module.css"
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture"
import Button from "@/components/button/letsurf/signoutButton"

export default async function ProfileLogo(){
    const session = await auth();

    const user = session?.user
    const userEmail = user?.email  as string;
    const existinguser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    let name = "";
    if (existinguser)
      name = existinguser.firstname;
    else
      name = "";
  

    return (
        <div className={styles.space}>
          {session ? (

              <div className={styles.user_menu}>
                <div className={styles.user_container}>
                  <ShowProfilePicture/> {name}
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
                        <Button title="Log Out"/>
                      </a>
                    </li>
                  </ul>
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
    )

    
}