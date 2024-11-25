import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import PlaceUploader from "@/components/imageUpload/uploader";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture";

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <PlaceUploader/>
          </div>
      </main>
    </div>
  );
}
