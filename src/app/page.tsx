import React, { useContext, useState, useEffect } from 'react';

import Image from "next/image";
import styles from "./page.module.css";

import BlendScreen from '@/BlendScreen';
import { Recipe } from '@/Apriblender';

const blenderMemory: Recipe[] = [];

export default function Home() {
  return (
    <div className={styles.container}>
      <BlendScreen blenderMemory={blenderMemory} />
    </div>
  );
}
