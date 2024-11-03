import styles from "./buttonGrid.module.css";
import Button2 from "../materialUIButtons/button2";


export default function ContinentPicker() {
    return (
      <div>
        <main>
            <div className={styles.buttonStyles}>
              <div className={styles.continent}>
              <Button2 title="Asia"/>
              </div>
              <div className={styles.continent}>
              <Button2 title="Europe"/>
              </div>
              <div className={styles.continent}>
              <Button2 title="North-America"/>
              </div>
              <div className={styles.continent}>
              <Button2 title="South-America"/>
              </div>
              <div className={styles.continent}>
              <Button2 title="Oceania"/>
              </div>
              <div className={styles.continent}>
              <Button2 title="Africa"/>
              </div>
            </div>
        </main>
      </div>
    );
  }