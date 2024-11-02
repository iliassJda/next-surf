import styles from "./page.module.css";
import BootstrapCarousel from "@/components/carousel/bootstrapCarousel";
import ContinentPicker from "@/components/buttonGrid/buttonGrid";

export default function Home() {
  const message = { text: "Hello world!" };
  return (
    <div>
      <main>
          <div className={styles.carousel}>
           <BootstrapCarousel/>
          </div>
          <div>
           <ContinentPicker/>
          </div>

          
  
      </main>
    </div>
  );
}
