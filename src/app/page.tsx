import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import Image from 'next/image'
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <Uploader/>
              <FloatingActionButton/>
          </div>
      </main>
    </div>
  );
}
