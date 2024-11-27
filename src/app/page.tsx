import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import SurfSpotUploader from "@/components/uploadCare/surfSpotUpload/uploader";

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
