import styles from "./navbar.module.css";

import SignOutButton from "../button/letsurf/signoutButton";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className={styles.navContainer}>
      {session ? (
        <div>
          <h1>YO {session.user?.email}</h1>
          <SignOutButton title="Log Out" />
        </div>
      ) : (
        <h1>NOT LOGGED IN</h1>
      )}
    </div>
  );
}
