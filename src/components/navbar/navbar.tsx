import styles from "./navbar.module.css";
import { kaushan } from "../fonts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import SearchBar from "../input/searchInput";
import SurfLogo from "../navbar/SurfLogo/logo"
import ProfileLogo from "../navbar/ProfileLogo/ProfileLogo"


export default async function Navbar() {
  

  return (
    <header>
      {/* <div id={styles.top_bar}></div> */}
      <div id={styles.main_bar}>
        
        <SurfLogo/>
        <SearchBar/>
        <ProfileLogo/>
        
      </div>
    </header>
  );
}
