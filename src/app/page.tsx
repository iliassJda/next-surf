
"use client"

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import PlaceUploader from "@/components/imageUpload/uploader";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture"

export default function Home() {
  // @ts-ignore
    return (
    <div>
      <main>
          <div className={styles.carousel}>
              <ShowProfilePicture/>
          </div>
      </main>
    </div>
  );
}
