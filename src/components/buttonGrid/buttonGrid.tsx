import styles from "./buttonGrid.module.css";
import MUIButton from "@/components/materialUIButtons/button1";
import BaseButtonPlainCss from "../materialUIButtons/button2";


export default function ContinentPicker() {
    return (
      <div>
        <main>
            <div className={styles.buttonStyles}>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="Asia"/>
              </div>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="Europe"/>
              </div>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="North-America"/>
              </div>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="South-America"/>
              </div>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="Oceania"/>
              </div>
              <div className={styles.continent}>
              <BaseButtonPlainCss title="Africa"/>
              </div>
            </div>
        </main>
      </div>
    );
  }