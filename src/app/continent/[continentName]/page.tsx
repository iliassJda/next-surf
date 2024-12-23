"use client"

import React from 'react';
import ContinentPage from '../../../components/continentPage/continentPage';
import {useSession} from "next-auth/react";
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";
import styles from "./continent.module.css"

const Continent = () => {
  const { data: session, status } = useSession();
  return (
    <div className={styles.container}>
      <ContinentPage/>
      {session? (
        <FloatingActionButton/>
      ) : null}
    </div>
  )};

export default Continent;
