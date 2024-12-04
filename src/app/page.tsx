"use client"
import styles from "./page.module.css";
import ContinentChanger from "@/components/contintsComp/main";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";
import Image from 'next/image'
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";
import {useSession} from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
  return (
    <div>
      <main>
          <div className={styles.carousel}>
            <ContinentChanger/>
              {session? (
              <FloatingActionButton/>
              ) : null}
          </div>
      </main>
    </div>
  );
}
