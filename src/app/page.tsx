import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";

export default function Home() {
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <ContinentChanger/>
          </div>
      </main>
    </div>
  );
}
