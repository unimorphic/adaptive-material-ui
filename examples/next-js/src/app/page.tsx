"use client";

import { AdaptiveSwitch } from "adaptive-material-ui/components/switch";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AdaptiveSwitch defaultChecked />
      </main>
    </div>
  );
}
