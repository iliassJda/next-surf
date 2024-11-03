'use client'
import { useState } from "react";
import BootstrapCarousel from "@/components/carousel/bootstrapCarousel";
import Button2 from "../materialUIButtons/button2";
import styles from "./main.module.css"

export default function ContinentChanger() {
  const message = { text: "Hello world!" };
  const[ContinentIndex, setIndex] = useState(0)

  function handleCLick(newIndex: number): void{
    setIndex(newIndex)
    console.log(newIndex)
  }
  return (
    <div>
          <div>
           <BootstrapCarousel imageIndex={ContinentIndex}/>
          </div>
          <div className={styles.buttonStyles}>
              <div className={styles.continent} >
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