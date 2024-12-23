'use client'
import BootstrapCarousel from "@/components/carousel/bootstrapCarousel";
import Button2 from "../materialUIButtons/button2";
import styles from "./main.module.css"
import {redirect} from "next/navigation";

export default function ContinentChanger() {


        //redirect to correct continent page
      function handleCLick(newIndex: number): void{
        switch (newIndex) {
            case 0:
                redirect("/continent/asia");
            case 1:
                redirect("/continent/europe");
            case 2:
                redirect("/continent/northamerica");
            case 3:
                redirect("/continent/southamerica");
            case 4:
                redirect("/continent/oceania");
            case 5:
                redirect("/continent/africa");

        }
      }
  return (
    <div>
          <div>
           <BootstrapCarousel />
          </div>
          <div className={styles.buttonStyles}>
              <div className={styles.continent}>
                <Button2 
                  title="Asia"
                  onClick={() => handleCLick(0)}
                 />
              </div>
              <div className={styles.continent}>
                <Button2 title="Europe" onClick={() => handleCLick(1)}/>
              </div>
              <div className={styles.continent}>
                <Button2 title="North-America" onClick={() => handleCLick(2)}/>
              </div>
              <div className={styles.continent}>
                <Button2 title="South-America" onClick={() => handleCLick(3)}/>
              </div>
              <div className={styles.continent}>
                <Button2 title="Oceania" onClick={() => handleCLick(4)}/>
              </div>
              <div className={styles.continent}>
                <Button2 title="Africa" onClick={() => handleCLick(5)}/>
              </div>
            </div>
    </div>
  );
}