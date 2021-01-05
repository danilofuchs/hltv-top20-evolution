import React from "react";
import { GitHubLogo } from "@src/assets/GithubLogo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.github}>
        <a
          href="https://github.com/danilofuchs/hltv-top20-evolution"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Made by @danilofuchs </span>
          <GitHubLogo />
        </a>
      </div>
      <div className={styles.victory}>
        <a
          href="https://formidable.com/open-source/victory/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Graphs made using Victory
        </a>
      </div>
    </footer>
  );
}
