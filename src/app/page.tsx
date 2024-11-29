import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import SurfSpotUploader from "@/components/uploadCare/surfSpotUpload/uploader";
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <Uploader/>
          </div>
      </main>
    </div>
  );
}
