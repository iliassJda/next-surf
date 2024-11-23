import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import ImageUploadButton from "@/components/imageUpload/upload";

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <ImageUploadButton/>
          </div>
      </main>
    </div>
  );
}
