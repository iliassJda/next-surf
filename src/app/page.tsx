import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import ImageUploadButton from "@/components/imageUpload/upload";
import tester from "@/components/uploadTest/tester";
import diver from "@/components/otherComp/diver";

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <diver/>
          </div>
      </main>
    </div>
  );
}
