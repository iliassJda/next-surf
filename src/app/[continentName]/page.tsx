"use client"

import React from 'react';
import ContinentPage from '../../components/continentPage/continentPage';
import {useSession} from "next-auth/react";
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";

const Continent = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <ContinentPage/>
      {session? (
        <FloatingActionButton/>
      ) : null}
    </div>
  )};

export default Continent;
