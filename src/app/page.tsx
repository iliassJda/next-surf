
"use client"

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import Uploader from "@/components/imageUpload/uploader";

export default function Home() {
  // @ts-ignore
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
